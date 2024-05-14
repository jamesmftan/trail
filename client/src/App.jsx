import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import io from "socket.io-client";
import { SOCKET_URL } from "./configuration/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const socket = io.connect(SOCKET_URL);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage socket={socket} />} />
          <Route path="/trail" element={<MainPage socket={socket} />} />
          <Route path="*" element={<LoginPage socket={socket} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
