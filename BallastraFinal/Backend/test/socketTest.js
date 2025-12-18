import { io } from 'socket.io-client';

// 🔑 paste a REAL JWT token here
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2NzcwOGIwLWRiNTktNGQyNy04MTczLTZjMDlmNmJlOTU2ZSIsImVtYWlsIjoibGFsaXRha3VtYXJpMzk4NDBAZ21haWwuY29tIiwiaWF0IjoxNzY2MDQ5NjU3LCJleHAiOjE3NjYwNTMyNTd9.9pOdflpVcWWWiyz03xNCjam-5qwsBBHe7pNV3_pUkSE';

console.log('Starting authenticated socket test...');

const socket = io('http://localhost:3000', {
  auth: {
    token: TOKEN
  },
  transports: ['websocket'],
  reconnection: false,
  timeout: 5000
});

socket.on('connect', () => {
  console.log('✅ Connected to socket server');
  console.log('Socket ID:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('❌ Connection error:', err.message);
});

socket.on('disconnect', (reason) => {
  console.log('⚠️ Disconnected:', reason);
});

// keep process alive for testing
setTimeout(() => {
  console.log('⏹ Ending socket test');
  // socket.disconnect();
  socket.close();   // cleaner than disconnect()
  process.exit(0);
}, 10000);
