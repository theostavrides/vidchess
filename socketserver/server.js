const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 3001;

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'hello my world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


server.listen(PORT, function() {
  console.log(`Socket server running on port ${PORT}`)
});