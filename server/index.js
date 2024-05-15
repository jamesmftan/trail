const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN ? process.env.ORIGIN.split(",") : "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
    credentials: true,
    optionsSuccessStatus: 200,
  },
});

app.use(cors());

const PORT = process.env.PORT || 3001;

const users = new Map();
const locations = new Map();

const getUsersInRoom = (room) => {
  return Array.from(users.values()).filter((user) => user.room === room);
};

const getLocationsInRoom = (room) => {
  return Array.from(locations.values()).filter((location) => {
    const user = users.get(location.id);
    return user && user.room === room;
  });
};

io.on("connection", (socket) => {
  socket.on("newUser", (newUser) => {
    newUser.id = socket.id;
    users.set(newUser.id, newUser);
    socket.join(newUser.room);
    io.to(newUser.room).emit("users", getUsersInRoom(newUser.room));
    console.log(users);
  });

  socket.on("message", (message) => {
    const user = users.get(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        id: socket.id,
        username: user.username,
        value: message.messageValue,
      });
    }
  });

  socket.on("location", (location) => {
    location.id = socket.id;
    const user = users.get(location.id);
    if (user) {
      location.username = user.username;
      locations.set(location.id, location);
      io.to(user.room).emit("userLocation", getLocationsInRoom(user.room));

      user.latitude = location.latitude;
      user.longitude = location.longitude;
      io.to(user.room).emit("users", getUsersInRoom(user.room));
    }
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(user.id);
      io.to(user.room).emit("users", getUsersInRoom(user.room));
    }

    if (locations.has(socket.id)) {
      locations.delete(socket.id);
      io.emit("userLocation", Array.from(locations.values()));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
