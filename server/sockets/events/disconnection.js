module.exports = (socket) => {

  let onDisconnection = () => {
    if (socket.mcbot) {
      socket.mcbot.end();
      delete socket.mcbot;
    }
  };

  socket.on('disconnect', onDisconnection);
  socket.on('bot:disconnect', onDisconnection);

};
