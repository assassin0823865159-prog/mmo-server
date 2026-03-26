const io = require('socket.io')(process.env.PORT || 3000, {
  cors: { origin: "*" }
});
let players = {};
io.on('connection', (socket) => {
  players[socket.id] = { x: 100, y: 100 };
  socket.on('move', (data) => {
    if(players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
    }
    io.emit('state', players);
  });
  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('state', players);
  });
});
