import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import LoadingPage from "./pages/LoadingPage";
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectToServer = () => {
      try {
        const socketConnect = io.connect(import.meta.env.VITE_SOCKET_URL);
        setSocket(socketConnect);
        setLoading(false);
      } catch (error) {
        console.log("Error connecting to the server.");
      }
    };
    connectToServer();
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  if (loading) return <LoadingPage />;

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
