import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const socket = io.connect(import.meta.env.VITE_SOCKET_URL);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage socket={socket} />} />
          <Route
            path="/trail"
            element={<MainPage socket={socket} isConnected={isConnected} />}
          />
          <Route path="*" element={<LoginPage socket={socket} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
