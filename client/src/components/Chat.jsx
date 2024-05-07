import React, { useEffect, useState } from "react";

const Chat = ({ socket }) => {
  const [inputValue, setInputValue] = useState([]);
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    socket.on("userMessages", (userMessages) => {
      setUserMessages((prevMessages) => [...prevMessages, userMessages]);
    });

    return () => {
      socket.off("userMessages");
    };
  }, [socket]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    socket.emit("userMessage", {
      id: socket.id,
      message: inputValue,
    });
    setInputValue("");
  };

  return (
    <>
      <div className="bg-white flex flex-col justify-between">
        <div className="h-[56.8rem] space-y-10 p-5 overflow-y-auto">
          {userMessages.map((userMessage, index) =>
            userMessage.id !== socket.id ? (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h1 className="ml-2">{userMessage.id}</h1>
                <p className="text-lg text-center bg-slate-200 rounded-md w-1/2 p-2">
                  {userMessage.message}
                </p>
              </div>
            ) : (
              <div key={index} className="flex flex-col items-end space-y-1">
                <h1 className="mr-2">{userMessage.id}</h1>
                <p className="text-lg text-center bg-slate-200 rounded-md w-1/2 p-2">
                  {userMessage.message}
                </p>
              </div>
            )
          )}
        </div>
        <div className="flex flex-row items-center">
          <input
            className="w-full bg-slate-200 p-3"
            type="text"
            placeholder="Write a message..."
            value={inputValue}
            onChange={handleChange}
          />
          <button className="text-white bg-green-900 p-3" onClick={handleClick}>
            SEND
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
