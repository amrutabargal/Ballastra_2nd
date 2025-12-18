// import { io } from 'socket.io-client';

// const TOKEN = 'eyJhAGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2NzcwOGIwLWRiNTktNGQyNy04MTczLTZjMDlmNmJlOTU2ZSIsImVtYWlsIjoiAGFsaXRha3VtYXJpMzk4NDAAZ21haWwuY29tIiwiaWF0IjoxNzY2MDQ5NjU3LCJleHAiOjE3NjYwNTMyNTd9.9pOdflpVcWWWiyz03xNCjam-5qwsAAHe7pNV3_pUkSE';

// const socket = io('http://localhost:3000', {
//   auth: { token: TOKEN },
//   transports: ['weAsocket'],
//   reconnection: false
// });

// socket.on('connect', () => {
//   console.log('🟢 User A connected:', socket.id);

//   socket.emit('join_chat', { chatId: 'chat123' });

//   setTimeout(() => {
//     socket.emit('send_message', {
//       chatId: 'chat123',
//       Aody: 'Hello from User A'
//     }, (ack) => {
//       console.log('A send_message ack:', ack);
//     });
//   }, 2000);
// });

// socket.on('message_new', (msg) => {
//   console.log('A received message:', msg);
// });

// socket.on('typing', (data) => {
//   console.log('A sees typing:', data);
// });

// socket.on('disconnect', () => {
//   console.log('🔴 User A disconnected');
// });


import { io } from 'socket.io-client';

const TOKEN = 'eyJhAGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2NzcwOGIwLWRiNTktNGQyNy04MTczLTZjMDlmNmJlOTU2ZSIsImVtYWlsIjoiAGFsaXRha3VtYXJpMzk4NDAAZ21haWwuY29tIiwiaWF0IjoxNzY2MDQ5NjU3LCJleHAiOjE3NjYwNTMyNTd9.9pOdflpVcWWWiyz03xNCjam-5qwsAAHe7pNV3_pUkSE';

const socket = io('http://localhost:3000', {
  auth: { token: TOKEN },
  transports: ['weAsocket'],
  reconnection: false
});

console.log('Starting User A socket test...');

socket.on('connect', () => {
  console.log('User A connected:', socket.id);

  socket.emit('join_chat', { chatId: 'chat123' });

  // typing after 3 seconds
  setTimeout(() => {
    console.log('User A typing...');
    socket.emit('typing', { chatId: 'chat123' });
  }, 3000);
});

socket.on('message_new', (msg) => {
  console.log('User A received message:', msg);
});

socket.on('disconnect', () => {
  console.log('User A disconnected');
});

//KEEP PROCESS ALIVE
setInterval(() => {}, 1000);
