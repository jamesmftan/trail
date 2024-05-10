import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Modal = ({ socket }) => {
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleUsernameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoomInputChange = (event) => {
    setRoom(event.target.value);
  };

  const navigate = useNavigate();

  const handleRoomButtonChange = () => {
    if (name !== "") {
      const newRoom = Math.random().toString(36).substring(2, 7);
      setRoom(newRoom);
      socket.emit("newUser", { id: socket.id, name, room: newRoom });
      navigate("/trail");
    }
  };

  const handleClick = () => {
    if (name !== "" && room !== "") {
      socket.emit("newUser", { id: socket.id, name, room });
      navigate("/trail");
    }
  };

  return (
    <>
      {isOpenModal && (
        <div className="bg-green-800 justify-center flex items-center h-screen p-8">
          <div className="bg-white shadow-2xl rounded-md flex flex-col gap-5 p-4 lg:p-8">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">WELCOME TO TRAIL</h1>
              <p className="text-lg font-normal leading-loose">
                Connect with your family and friends on the map and chat with
                them effortlessly.
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
                  name ? "" : "pointer-events-none opacity-50"
                }`}
              >
                <input
                  type="text"
                  className="rounded-l-md border-t-2 border-b-2 border-l-2 border-slate-200 outline-none px-2 py-1 grow"
                  placeholder="Enter Room ID"
                  onChange={handleRoomInputChange}
                />
                <button
                  className="text-black hover:text-white bg-green-800 hover:bg-green-950 rounded-r-md  justify-center flex items-center border-2 border-slate-200 transition-all duration-300 px-2 py-1"
                  onClick={handleClick}
                >
                  <LogIn />
                </button>
              </div>
              <p
                className={`text-center ${
                  name ? " " : "pointer-events-none opacity-50"
                }`}
              >
                or
              </p>
              <button
                className={`text-white bg-green-800 hover:bg-green-950 rounded-md border-2 border-slate-200 w-full transition-all duration-300 px-2 py-1 ${
                  name && !room ? "" : "opacity-50 pointer-events-none"
                }`}
                onClick={handleRoomButtonChange}
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
