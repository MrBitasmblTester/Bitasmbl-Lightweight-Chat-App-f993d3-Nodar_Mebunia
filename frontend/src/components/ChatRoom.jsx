import React, { useEffect, useRef, useState } from 'react';
import { createSocket } from '../services/socketClient';
export default function ChatRoom({ room, anonId }){
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  useEffect(()=>{
    const s = createSocket(anonId); socketRef.current = s;
    s.emit('join',{room, anonId});
    s.on('message', m => setMessages(prev => [...prev, m]));
    return ()=>s.close();
  },[room, anonId]);
  const send = (text)=> socketRef.current && socketRef.current.emit('message',{text});
  return (
    <div>
      <h3>{room}</h3>
      <div>{messages.map(m => <div key={m.time}>{m.id}: {m.text} <small>{new Date(m.time).toLocaleTimeString()}</small></div>)}</div>
      <input onKeyDown={e=>{ if(e.key==='Enter') { send(e.target.value); e.target.value=''; } }} />
    </div>
  );
}