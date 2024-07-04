import React, { useState } from "react";
import { PulseBeams } from "../components/PulseBeams";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRoomInputChange = (event) => {
    setRoom(event.target.value);
  };

  const navigate = useNavigate();

  const handleRoomButtonChange = () => {
    if (username !== "") {
      const newRoom = Math.random().toString(36).substring(2, 7);
      setRoom(newRoom);
      socket.emit("newUser", { username, room: newRoom });
      navigate("/trail");
    }
  };

  const newUserClick = () => {
    if (username !== "" && room !== "") {
      socket.emit("newUser", { username, room });
      navigate("/trail");
    }
  };

  return (
    <div className="bg-slate-950 justify-center flex items-center relative h-screen p-8 overflow-hidden antialiased">
      <div className="bg-white shadow-2xl rounded-md flex flex-col gap-5 p-4 lg:p-8 z-50">
        <div className="space-y-3">
          <h1 className="text-2xl text-slate-700 font-bold">
            WELCOME TO TRAIL
          </h1>
          <p className="text-lg text-slate-700 font-medium tracking-tight leading-loose">
            Connect with your family and friends on the map and chat with them
            effortlessly.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <input
            type="text"
            className="rounded-md outline-none border-2 border-slate-200 px-2 py-1"
            placeholder="Enter Username"
            onChange={handleUsernameChange}
          />
          <div
            className={`flex flex-row ${
              username ? "" : "pointer-events-none opacity-50"
            }`}
          >
            <input
              type="text"
              className="rounded-l-md border-t-2 border-b-2 border-l-2 border-slate-200 outline-none px-2 py-1 grow"
              placeholder="Enter Room ID"
              onChange={handleRoomInputChange}
            />
            <button
              className="text-white bg-slate-700 hover:bg-slate-950 rounded-r-md justify-center flex items-center border-2 border-slate-200 transition-all duration-300 px-2 py-1"
              onClick={newUserClick}
            >
              <LogIn />
            </button>
          </div>
          <p
            className={`text-center ${
              username ? " " : "pointer-events-none opacity-50"
            }`}
          >
            or
          </p>
          <button
            className={`text-white bg-slate-700 hover:bg-slate-950 rounded-md border-2 border-slate-200 w-full transition-all duration-300 px-2 py-1 ${
              username && !room ? "" : "opacity-50 pointer-events-none"
            }`}
            onClick={handleRoomButtonChange}
          >
            Create Room
          </button>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <PulseBeams />
      </div>
    </div>
  );
};

export default LoginPage;
