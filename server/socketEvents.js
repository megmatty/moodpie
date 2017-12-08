exports = module.exports = function (io) {
  // Set socket.io listeners.
  io.on('connection', (socket) => {
    console.log('a user connected');

  socket.on('add entry', (entry) => {
    console.log('desert shade', entry);
    io.emit('new entry', entry);
  });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
