import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
export default function App(){
  const [room] = useState('general');
  const [anonId] = useState(()=>localStorage.getItem('anonId') || ('anon_'+Math.random().toString(36).slice(2,8)));
  localStorage.setItem('anonId', anonId);
  return <ChatRoom room={room} anonId={anonId} />;
}