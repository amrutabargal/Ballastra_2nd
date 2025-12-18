// import { io } from 'socket.io-client';

// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwNmQxZGViLWYxYmItNDI4Ny1hMDc2LWFjNDE1ODBjM2UwMSIsImVtYWlsIjoibGFsaXRhcmFuYTU0M0BnbWFpbC5jb20iLCJpYXQiOjE3NjYwNTA1NzEsImV4cCI6MTc2NjA1NDE3MX0.CYjhYDsWOoL2iZyDdOcSW4VyqBuNznohmRqrIB_C9us';

// const socket = io('http://localhost:3000', {
//   auth: { token: TOKEN },
//   transports: ['websocket'],
//   reconnection: false
// });

// socket.on('connect', () => {
//   console.log('🟢 User B connected:', socket.id);

//   socket.emit('join_chat', { chatId: 'chat123' });

//   setTimeout(() => {
//     socket.emit('typing', { chatId: 'chat123' });
//   }, 1000);
// });

// socket.on('message_new', (msg) => {
//   console.log('B received message:', msg);
// });

// socket.on('disconnect', () => {
//   console.log('🔴 User B disconnected');
// });


import { io } from 'socket.io-client';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwNmQxZGViLWYxYmItNDI4Ny1hMDc2LWFjNDE1ODBjM2UwMSIsImVtYWlsIjoibGFsaXRhcmFuYTU0M0BnbWFpbC5jb20iLCJpYXQiOjE3NjYwNTA1NzEsImV4cCI6MTc2NjA1NDE3MX0.CYjhYDsWOoL2iZyDdOcSW4VyqBuNznohmRqrIB_C9us';

const socket = io('http://localhost:3000', {
  auth: { token: TOKEN },
  transports: ['websocket'],
  reconnection: false
});

console.log('Starting User B socket test...');

socket.on('connect', () => {
  console.log('🟢 User B connected:', socket.id);

  socket.emit('join_chat', { chatId: 'chat123' });

  // send message after 5 seconds
  setTimeout(() => {
    console.log('📤 User B sending message...');
    socket.emit(
      'send_message',
      { chatId: 'chat123', body: 'Hello from User B' },
      (ack) => console.log('ACK from server:', ack)
    );
  }, 5000);
});

socket.on('typing', (data) => {
  console.log('⌨️ User B sees typing:', data);
});

socket.on('message_new', (msg) => {
  console.log('📩 User B received message:', msg);
});

socket.on('disconnect', () => {
  console.log('🔴 User B disconnected');
});

// 🔥 KEEP PROCESS ALIVE
setInterval(() => {}, 1000);
