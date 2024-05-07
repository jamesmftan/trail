import React, { useState } from "react";

const Modal = ({ socket }) => {
  const [name, setName] = useState([]);
  const [closeModal, setCloseModal] = useState(true);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = () => {
    socket.emit("userInfo", {
      name: name,
    });
    setCloseModal(false);
  };

  return (
    <>
      {closeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-5 flex flex-col">
            <h1 className="text-2xl font-bold mb-3">Welcome to the Trail!</h1>
            <p className="text-lg mb-3">
              Here you can see your family and friends around you on the map and
              chat with them.
            </p>
            <input type="text" onChange={handleChange} />
            <button
              className="text-white bg-green-500 py-2 px-4 rounded-md"
              onClick={handleClick}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
