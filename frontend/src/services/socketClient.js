import { io } from 'socket.io-client';
export function createSocket(anonId){
  const socket = io('http://localhost:3000', { auth: { anonId }, transports: ['websocket'], autoConnect: true });
  socket.on('connect', ()=>console.log('socket connected', socket.id));
  socket.on('reconnect_attempt', ()=>console.log('reconnect attempt'));
  return socket;
}