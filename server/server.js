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

var corsOptions = {
  origin: 'http://localhost:3000',
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

    }
    io.to(room).send(`Client connected to socket room ${room}`);

  })

  socket.on("move", function (data) {
    socket.to(room).emit('move', data);
  })
  //hello again!!!
  socket.on('chat', function(data) {

  })
});

server.listen(PORT, function() {
  console.log(`Socket server running on port ${PORT}`)
});



//hello!!


