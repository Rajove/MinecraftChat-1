const mineflayer = require('mineflayer');
const moment = require('moment');
const events = require('../../bot');

module.exports = (socket) => {

  let onConnection = async (data) => {

    let timestamp = moment().format('MMM D h:mm:ss a');

    // log activity to console
    console.log(`${timestamp}: connecting > ${data.hostname}:${data.port} - ${data.version} - ${data.username}`);

    // inform user that connection is being made
    socket.emit('buffer:info', `Connecting to ${data.version} server ${data.hostname}:${data.port}`);

    // if a bot already exists, ask user to disconnect
    if (socket.mcbot) {
      socket.emit('buffer:error', 'Please disconnect before connecting again');
      return;
    }

    // create a mineflayer bot and store it in the client's socket
    socket.mcbot = await mineflayer.createBot({
      host: data.hostname,
      port: data.port,
      username: data.username,
      password: data.password,
      version: data.version || "1.12.2"
    });

    // store connection params in socket
    socket.connectionParams = data;

    // bind bot events
    events(socket);

  };

  socket.on('server:connect', onConnection);

};
