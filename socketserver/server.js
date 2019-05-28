const app           = require('express')();
const server        = require('http').Server(app);
const io            = require('socket.io')(server);
const PORT          = 3001;
const environment   = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const configuration = require('./knexfile')[environment];    // require environment's settings from knexfile
const database      = require('knex')(configuration);              // connect to DB via knex using env's settings
const helpers       = require('./data/helpers')(database);


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'hello my world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

helpers.getMovesOfGame(3).then(res => console.log(res))

server.listen(PORT, function() {
  console.log(`Socket server running on port ${PORT}`)
});