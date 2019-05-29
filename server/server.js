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

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'hello my world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

function login(username, password) {
  validate.userLogin({ username, password })
    .then(res => {
      console.log('user logged in successfully')
    })
    .catch(e => {
      if (e.message === 'invalid password') console.log('bad pass') //handle err
      if (e.message === 'invalid username') console.log('bad user')
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