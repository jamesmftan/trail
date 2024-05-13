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
let locations = [];

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
  });

  // Disconnect
  socket.on("disconnect", () => {
    const user = users.find((u) => u.id === socket.id);
    if (user) {
      users = users.filter((u) => u.id !== socket.id);
      io.to(user.room).emit(
        "users",
        users.filter((u) => u.room === user.room)
      );
    }

    const locationIndex = locations.findIndex((l) => l.id === socket.id);
    if (locationIndex !== -1) {
      locations.splice(locationIndex, 1);
      io.emit("userLocation", locations);
    }
  });

  // Chat
  socket.on("message", (message) => {
    const user = users.find((u) => u.id === socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        id: message.id,
        value: message.messageValue,
        username: user.username,
      });
    }
  });

  // Location
  socket.on("location", (location) => {
    location.id = socket.id;
    const user = users.find((u) => u.id === location.id);
    const existingLocationIndex = locations.findIndex(
      (l) => l.id === location.id
    );

    if (existingLocationIndex === -1) {
      locations.push(location);
    } else {
      locations[existingLocationIndex] = location;
    }

    if (user) {
      const locationsInRoom = locations.filter(
        (l) => users.find((u) => u.id === l.id)?.room === user.room
      );
      location.username = user.username;
      io.to(user.room).emit("userLocation", locationsInRoom);

      const userIndex = users.findIndex((u) => u.id === location.id);
      if (userIndex !== -1) {
        users[userIndex].latitude = location.latitude;
        users[userIndex].longitude = location.longitude;
      }
      io.to(user.room).emit(
        "users",
        users.filter((u) => u.room === user.room)
      );
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
