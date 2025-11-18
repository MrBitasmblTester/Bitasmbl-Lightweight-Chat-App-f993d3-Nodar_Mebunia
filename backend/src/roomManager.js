class RoomManager{
  constructor(){ this.sockets = {}; this.rooms = {}; }
  join(socket,{room,anonId}){
    socket.data.anonId = anonId || ('anon_'+socket.id.slice(0,6));
    socket.join(room);
    this.sockets[socket.id]=room;
    this.rooms[room]=this.rooms[room]||[];
    socket.emit('joined',{room,anonId:socket.data.anonId});
  }
  handleMessage(socket,msg,io){
    const room=this.sockets[socket.id]; if(!room) return;
    const message={id:socket.data.anonId,text:msg.text,time:Date.now()};
    this.rooms[room].push(message);
    io.to(room).emit('message',message);
  }
  disconnect(socket){ delete this.sockets[socket.id]; }
}
module.exports=RoomManager;