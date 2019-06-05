const app           = require('express')();
const server        = require('http').Server(app);
const io            = require('socket.io')(server);
const PORT          = 3001;
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database      = require('knex')(configuration);
const dataHelpers   = require('./helpers/dataHelpers.js')(database);
const validate      = require('./helpers/authHelpers.js')(database);
const bcrypt        = require('bcrypt');
const cookieSession = require("cookie-session");
const cors          = require('cors')
const bodyParser    = require("body-parser");
const uuid = require('uuid/v1');



var corsOptions = {
  origin: 'http://192.168.88.101:3000',
  credentials: true
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1','key2'],
  maxAge: 24 * 60 * 60 * 1000
}));

//HELPERS

function login(username, password) {
  return validate.userLogin({ username, password })
}

function register(username, password, email) {
  return validate.userRegister({ username, password, email})
}

function randomString(length) {
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += str[Math.floor(Math.random() * 62)];
  }
  return code;
}

//SOCKET HELPERS

function NumClientsInRoom(namespace, room) {
  var clientsInRoom = io.nsps['/'].adapter.rooms[room];
  return clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;
}

//API ROUTES
app.get('/auth', cors(corsOptions), function (req, res, next) {
  req.session.username ? res.status(200).send(req.session.username) : res.status(401).send('user not logged in');
})

app.post("/login", cors(corsOptions), function (req, res) {
  function sendError(e) {
    res.status(401).send(e.message)
  }
  function setCookie(){
    req.session.username = req.body.username;
    res.status(200).send();
  }
  if (req.body.username && req.body.password) {
    login(req.body.username, req.body.password).then(setCookie, sendError)
  }
});

app.post("/register", cors(corsOptions), function (req, res) {
  function sendError(e) {
    res.status(401).send(e.message)
  }
  function setCookie(){
    req.session.username = req.body.username;
    res.status(200).send();
  }
  if (req.body.username && req.body.password && req.body.email) {
    register(req.body.username, req.body.password, req.body.email).then(setCookie, sendError)
  }
});

app.post("/newLink", cors(corsOptions), function (req, res) {
  const roomData = {
    creator: req.session.username,
    time_per_move: req.body.time,
    start_color: getColor(req.body.color),
    url: randomString(10),
    current_game: null,
    games_completed: 0,
    creator_victories: 0,
  }

  //if a player selects random color, this needs to be
  //dealt with before game & room inserted into db
  function getColor(selectedColor){
    return (selectedColor === 'r') ? ['w','b'][Math.floor(Math.random() * 2)] : selectedColor;
  }

  dataHelpers.newGameAndRoom(roomData).then(() => res.status(200).send(roomData.url))
});

app.get("/rooms/:id", cors(corsOptions), function(req, res) {
  const roomurl = req.params.id;
  dataHelpers.getRoomData(roomurl).then( data => res.status(200).send(data[0]), console.error);
})

app.get("/games/:id", cors(corsOptions), function(req, res) {
  let username = req.session.username;
  const gameid = req.params.id;
  dataHelpers.getGame(gameid).then( data => {
    const gameData = data[0]
    if (data[0].white_id === null) {
      dataHelpers.addPlayerToGame('w', username, gameid, data[0]).then(res.status(200).send(gameData))
    } else if (data[0].black_id === null) {
      dataHelpers.addPlayerToGame('b', username, gameid, data[0]).then(res.status(200).send(gameData))
    } else {
      res.status(200).send(gameData)
    }
  })
})

//SOCKET LOGIC
io.on('connection', function (socket) {

  let room;

  socket.on('joinRoom', function(data) {
    const username = data.username;
    room = data.room;

    if (NumClientsInRoom('/', room) < 2) {
      socket.join(room);
      console.log(`${username} joined room ${room}`);
      io.to(room).emit(`roomFull`,false);
    }
    io.to(room).send(`${username} connected to socket room ${room}`);


    //When two players are in the room, the link box must disappear
    if (NumClientsInRoom('/', room) == 2) {
      io.to(room).emit(`roomFull`,true);
    }

  })

  socket.on("move", function (data) {
    socket.to(room).emit('move', data);

    let gameData = data.state.gameData;
    let username = data.username;
    let gameObj = data.game;
    let move = data.lastMove.from + data.lastMove.to;

    dataHelpers.addMove(gameData.id, move).then(console.log,console.error)
  })

  //Listen for checkmate event (event comes from loser)
  socket.on("checkmate", function(data) {
    let gameData = data.gameData;
    let username = data.username;
    let winner = ''
    data.color === 'w' ? winner = 'b' : winner = 'w';
    let roomid = data.roomData.id;
    let loserUsername = data.username;
    let roomCreator = data.roomData.creator;
    dataHelpers.endGame( gameData.id, winner ).then(() => {
      dataHelpers.upDataRoomVictories(roomid, loserUsername, roomCreator).then(() => {
        gameOverUpdate(data);
      })
    })
  })

  function gameOverUpdate(data) {
    let roomData = {}
    let gameData = {}
    dataHelpers.getRoomData(data.roomData.url)
      .then(res => roomData = res[0])
      .then(dataHelpers.getGame(data.gameData.id)
        .then(res => sendUpdateData(roomData, res[0])))
  }

  function sendUpdateData(roomData, gameData){
    let white_username = '';
    let black_username = '';
    dataHelpers.getUsername(gameData.white_id).then(res => {
      white_username = res[0]
      dataHelpers.getUsername(gameData.black_id).then(res => {
        black_username = res[0]}).then(() => {
          io.to(room).emit("gameOver", {roomData, gameData, white_username, black_username})
        })
    })

  }

  //Hande rematchRequest event
  socket.on("rematchRequest", function(data) {
    console.log("rematchRequest received")
    console.log(data)
    let roomId = data.roomData.id;
    let url = data.roomData.url
    let oldWhitePlayer = data.white_username.username;
    let oldWhiteId = data.gameData.white_id;
    let oldBlackPlayer = data.black_username.username;
    let oldBlackId = data.gameData.black_id;

    dataHelpers.newGameReturningId({white_id: oldBlackId, black_id: oldWhiteId})
      .then(res => { dataHelpers.updateCurrentGameInRoom(roomId, res[0])})
      .then(() => { io.to(room).emit('startRematch', url) })


  })

  socket.on('chat', function(data, callback) {
    const message = {
      content: data.content,
      id: uuid()
    }
    if (callback) {
      callback(message);
    }
    socket.broadcast.emit('msg', message)
  })
});

server.listen(PORT, function() {
  console.log(`Socket server running on port ${PORT}`)
});
