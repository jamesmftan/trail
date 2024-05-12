import React from "react";
import { SendHorizontal, X } from "lucide-react";
const ChatModal = ({
  socket,
  messages,
  messageValue,
  messageChange,
  messageClick,
  chatClick,
}) => {
  return (
    <div className="bg-none justify-center flex flex-row items-center border-2 border-slate-200 mx-auto fixed inset-0 z-50 gap-10 pt-3 pb-3 pl-10 pr-10">
      <div className="bg-white backdrop-blur-3xl rounded-lg shadow-lg flex flex-col justify-between min-w-72 w-1/2 min-h-96 h-1/2">
        <div className="justify-end flex items-center border-b-2 p-5">
          <button onClick={chatClick}>
            <X />
          </button>
        </div>
        <div className="h-[90%] space-y-10 p-5 overflow-y-auto">
          {messages.map((message, index) =>
            message.id !== socket.id ? (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h1 className="ml-1">{message.username}</h1>
                <p className="text-base text-center bg-slate-200 rounded-md max-w-lg px-3 py-2">
                  {message.value}
                </p>
              </div>
            ) : (
              <div key={index} className="flex flex-col items-end space-y-1">
                <h1 className="mr-1">{message.username}</h1>
                <p className="text-base text-center bg-slate-200 rounded-md max-w-lg px-3 py-2">
                  {message.value}
                </p>
              </div>
            )
          )}
        </div>
        <div className="flex flex-row items-center border-t-2 p-5">
          <input
            className="grow outline-none"
            type="text"
            placeholder="Write a message..."
            value={messageValue}
            onChange={messageChange}
          />
          <button onClick={messageClick}>
            <SendHorizontal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
