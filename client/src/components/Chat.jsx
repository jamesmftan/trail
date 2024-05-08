import React, { useEffect, useState } from "react";

const Chat = ({ socket }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    socket.emit("message", { value, id: socket.id });
    setValue("");
  };

  return (
    <>
      <div className="bg-white flex flex-col justify-between">
        <div className="h-[56.8rem] space-y-10 p-5 overflow-y-auto">
          {messages.map((message, index) =>
            message.id !== socket.id ? (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h1 className="ml-2">{message.username}</h1>
                <p className="text-base text-center bg-slate-200 rounded-md px-3 py-2">
                  {message.value}
                </p>
              </div>
            ) : (
              <div key={index} className="flex flex-col items-end space-y-1">
                <h1 className="mr-2">{message.username}</h1>
                <p className="text-base text-center bg-slate-200 rounded-md px-3 py-2">
                  {message.value}
                </p>
              </div>
            )
          )}
        </div>
        <div className="flex flex-row items-center">
          <input
            className="w-full bg-slate-200 outline-none p-3"
            type="text"
            placeholder="Write a message..."
            value={value}
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
