import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: {
    token: "PASTE_JWT_TOKEN_HERE"
  }
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("join_chat", { chatId: 1 });

  socket.emit("send_message", {
    chatId: 1,
    body: "Hello from socket test"
  }, (ack) => {
    console.log("ACK:", ack);
  });
});

socket.on("message_new", (msg) => {
  console.log("New message:", msg);
});
