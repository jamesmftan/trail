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

let users = [];

io.on("connection", (socket) => {
  // Userlist
  socket.on("newUser", (newUser) => {
    socket.join(newUser.room);
    newUser.id = socket.id;
    const existingUserIndex = users.findIndex((u) => u.id === newUser.id);
    if (existingUserIndex === -1) {
      users.push(newUser);
    } else {
      users[existingUserIndex] = newUser;
    }
    io.to(newUser.room).emit(
      "users",
      users.filter((u) => u.room === newUser.room)
    );
  });

  socket.on("disconnect", () => {
    const user = users.find((u) => u.id === socket.id);
    if (user) {
      users = users.filter((u) => u.id !== socket.id);
      io.to(user.room).emit(
        "users",
        users.filter((u) => u.room === user.room)
      );
    }
  });

  // Chat
  socket.on("message", (message) => {
    const user = users.find((u) => u.id === socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        id: message.id,
        value: message.value,
        username: user.name,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
