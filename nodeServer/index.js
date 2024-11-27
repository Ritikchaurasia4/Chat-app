// Node server which will handle socket io connections

const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const users = {};

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Listen many incomming events
  console.log("connection");
  socket.on("new-user-joined", (name) => {
    // Handle perticular connections
    console.log("New User", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("message", (message) => {
    console.log("message received", message)
    // save in DB
    // broadcast to room
    socket.broadcast.emit("broacast", message)
  })
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
