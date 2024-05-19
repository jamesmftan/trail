import React, { useEffect, useRef } from "react";
import { SendHorizontal, X } from "lucide-react";

const ChatModal = ({
  socket,
  messages,
  messageValue,
  messageChange,
  messageClick,
  chatModalClick,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    const element = document.querySelector(".scroll-to-bottom");
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const enterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      messageClick();
      scrollToBottom();
    }
  };

  return (
    <div className="bg-slate-700 bg-opacity-50 justify-center flex flex-row items-center mx-auto fixed inset-0 z-50 gap-10 pt-3 pb-3 pl-8 pr-8">
      <div className="bg-white backdrop-blur-3xl rounded-lg shadow-lg justify-between flex flex-col min-w-full lg:min-w-96 lg:w-1/2 min-h-96 h-1/2">
        <div className="border-b-2 border-slate-200 justify-end flex items-center p-3">
          <button
            className="hover:bg-slate-200 rounded-[4px] px-3 py-2 transition-all duration-300"
            onClick={chatModalClick}
          >
            <X color="#334454" />
          </button>
        </div>
        <div className="h-full space-y-10 p-5 overflow-x-hidden overflow-y-auto scroll-to-bottom">
          {messages.map((message, index) =>
            message.id === socket.id ? (
              <div key={index} className="flex flex-col items-end space-y-1">
                <h1 className="text-slate-700 font-medium mr-1">You</h1>
                <p className="text-slate-700 font-normal tracking-tight leading-loose break-words whitespace-pre-wrap bg-slate-200 rounded-[4px] w-1/2 lg:w-2/5 px-3 py-2">
                  {message.value}
                </p>
              </div>
            ) : (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h1 className="text-slate-700 font-medium ml-1">
                  {message.username}
                </h1>
                <p className="text-slate-700 font-normal tracking-tight leading-loose break-words whitespace-pre-wrap bg-slate-200 rounded-[4px] w-1/2 lg:w-2/5 px-3 py-2">
                  {message.value}
                </p>
              </div>
            )
          )}
          <div ref={messagesEndRef} onKeyDown={enterKeyPress} tabIndex={-1} />
        </div>
        <div className="border-t-2 border-slate-200 flex flex-row items-center p-3">
          <textarea
            className="resize-none outline-none grow p-3"
            type="text"
            placeholder="Write a message..."
            rows={1}
            value={messageValue}
            onChange={messageChange}
            onKeyPress={enterKeyPress}
          />
          <button
            className="hover:bg-slate-200 rounded-[4px] px-3 py-2 transition-all duration-300"
            onClick={messageClick}
          >
            <SendHorizontal color="#334454" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
