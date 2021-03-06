module.exports = (socket) => {

  let onmove = () => {
    if (!socket.mcbot) { return; }

    var pos = socket.mcbot.entity.position;
    if (movingornot(socket.mcbot.entity.velocity)) {
      socket.emit('bot:move', {
        x: parseFloat(pos.x.toFixed(2)),
        y: parseFloat(pos.y.toFixed(2)),
        z: parseFloat(pos.z.toFixed(2))
      });
    }
  };

  socket.mcbot.on('move', onmove);

  let onforcedMove = () => {
    if (!socket.mcbot) { return; }

    var pos = socket.mcbot.entity.position;
    socket.emit('bot:move', {
      x: parseFloat(pos.x.toFixed(2)),
      y: parseFloat(pos.y.toFixed(2)),
      z: parseFloat(pos.z.toFixed(2))
    });
  };

  socket.mcbot.on('forcedMove', onforcedMove);

  function movingornot(v) {
    if (v.x != 0) return true;
    if (v.y != 0) return true;
    if (v.z != 0) return true;
  }
};
