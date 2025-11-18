const { Server } = require('socket.io');
const RoomManager = require('./roomManager');
module.exports.setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });
  const rooms = new RoomManager();
  io.on('connection', socket => {
    socket.on('join', data => rooms.join(socket, data));
    socket.on('message', msg => rooms.handleMessage(socket, msg, io));
    socket.on('disconnect', () => rooms.disconnect(socket));
  });
  return io;
};