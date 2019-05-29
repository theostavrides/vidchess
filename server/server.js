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


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}


app.get('/auth', cors(corsOptions), function (req, res, next) {
  console.log(req.session)
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.post("/login", cors(corsOptions), function (req, res) {
  if (req.body.username && req.body.password) {
    login(req.body.username, req.body.password)
      .then(res.status(200).send())
      .catch(e => res.status(401).send(e.message))
  }
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'hello my world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

function isLoggedIn(session){
  console.log(session)
}

function login(username, password) {
  return validate.userLogin({ username, password })
    .then(res => {
      return res;
    })
    .catch(e => {
      throw new Error(e.message);
    })
}

function register(username, password, email) {
  validate.userRegister({ username, password, email})
    .then(res => {
      console.log('user registered successfully')
      //do stuff
    })
    .catch(e => {
      if (e.message === 'username taken') console.log('username taken') //handle err
    })
}

server.listen(PORT, function() {
  console.log(`Socket server running on port ${PORT}`)
});