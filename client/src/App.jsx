import React from "react";
import Modal from "./components/Modal";
import UserList from "./components/UserList";
import TrailMap from "./components/TrailMap";
import Chat from "./components/Chat";
import io from "socket.io-client";
import { SOCKET_URL } from "./configuration/index";

const App = () => {
  const socket = io.connect(SOCKET_URL);
  return (
    <>
      <Modal socket={socket} />
      <div className="grid grid-cols-4 h-screen">
        <UserList socket={socket} />
        <TrailMap socket={socket} />
        <Chat socket={socket} />
      </div>
    </>
  );
};

export default App;
