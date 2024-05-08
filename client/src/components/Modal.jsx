import React, { useState } from "react";
import { LogIn } from "lucide-react";

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

  const handleRoomButtonChange = () => {
    if (name !== "") {
      const newRoom = Math.random().toString(36).substring(2, 7);
      setRoom(newRoom);
      socket.emit("newUser", { id: socket.id, name, room: newRoom });
      setIsOpenModal(false);
    }
  };

  const handleClick = () => {
    if (name !== "" && room !== "") {
      socket.emit("newUser", { id: socket.id, name, room });
      setIsOpenModal(false);
    }
  };

  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 shadow-2xl flex items-center justify-center bg-green-900 bg-opacity-100 p-4 lg:p-8 z-50">
          <div className="bg-white rounded-md flex flex-col space-y-5 p-10">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">WELCOME TO TRAIL</h1>
              <p className="text-lg">
                Connect with your family and friends on the map and chat with
                them effortlessly.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
              <input
                type="text"
                className="rounded-md outline-none border-2 border-slate-200 px-2 py-1"
                placeholder="Enter Username"
                onChange={handleUsernameChange}
              />
              <div
                className={`grid grid-cols-12 lg:flex lg:flex-row lg:items-center ${
                  name ? "" : "pointer-events-none opacity-50"
                }`}
              >
                <input
                  type="text"
                  className="rounded-l-md outline-none border-t-2 border-b-2 border-l-2 border-slate-200 px-2 py-1 col-span-11"
                  placeholder="Enter Room ID"
                  onChange={handleRoomInputChange}
                />
                <button
                  className="rounded-r-md justify-center flex items-center border-2 border-slate-200 px-2 py-1"
                  onClick={handleClick}
                >
                  <LogIn color="#1e293b" />
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
                className={`text-white bg-green-700 rounded-md border-2 border-slate-200 hover:bg-green-950 w-full px-2 py-1 ${
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
