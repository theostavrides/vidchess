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
function isLoggedIn(session){
  console.log(session)
}

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

//API ROUTES
app.get('/auth', cors(corsOptions), function (req, res, next) {
  req.session ? res.status(200).send() : res.status(401).send();
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
  const username = req.session.username;
  const time = req.body.time;
  const color = req.body.color;
  const url = randomString(8);
  res.status(200).send(url);
});


//SOCKET LOGIC
io.on('connection', function (socket) {

  socket.emit('news', { hello: 'hello my world' });
  socket.on('msg', function (data) {
    console.log(data);
    console.log(io.sockets.adapter.rooms)
  });
});

server.listen(PORT, function() {
  console.log(`Socket server running on port ${PORT}`)
});






