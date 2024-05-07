const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN.split(","),
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
    credentials: true,
    optionsSuccessStatus: 200,
  },
});

app.use(cors());

const PORT = 3001;

let connectedUsers = [];

io.on("connection", (socket) => {
  const sendUpdatedUserList = () => {
    io.emit("userList", connectedUsers);
  };

  socket.on("user", (user) => {
    user.id = socket.id;
    const existingUserIndex = connectedUsers.findIndex((u) => u.id === user.id);
    if (existingUserIndex === -1) {
      connectedUsers.push(user);
      sendUpdatedUserList();
    } else {
      connectedUsers[existingUserIndex] = user;
      sendUpdatedUserList();
    }
  });

  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter((u) => u.id !== socket.id);
    sendUpdatedUserList();
  });

  socket.on("userMessage", (userMessage) => {
    io.emit("userMessages", userMessage);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
