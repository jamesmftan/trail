import React, { useEffect, useState } from "react";
import {
  Users,
  MessageSquare,
  Clipboard,
  SendHorizontal,
  X,
} from "lucide-react";

const BottomButtons = ({ socket }) => {
  const [messageValue, setMessageValue] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [trailersModalOpen, setTrailersModalOpen] = useState(false);
  const [copy, setCopy] = useState(false);
  const roomID = connectedUsers[0]?.room;

  useEffect(() => {
    socket.on("users", (usernameList) => {
      setConnectedUsers(usernameList);
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("users");
      socket.off("message");
    };
  }, [socket]);

  const messageChange = (event) => {
    setMessageValue(event.target.value);
  };

  const messageClick = () => {
    socket.emit("message", { messageValue, id: socket.id });
    setMessageValue("");
  };

  const trailersClicked = () => {
    setTrailersModalOpen(!trailersModalOpen);
  };

  const chatClicked = () => {
    setChatModalOpen(!chatModalOpen);
  };

  const copyRoomID = () => {
    if (roomID) {
      navigator.clipboard.writeText(roomID).then(() => {
        setCopy(true);
        setTimeout(() => setCopy(false), 1000);
      });
    }
  };

  return (
    <>
      <div className="text-black text-center font-normal bg-slate-200 opacity-[80%] backdrop-blur-3xl justify-center flex flex-row items-center rounded-full border-2 border-white fixed bottom-5 z-50 gap-10 pt-3 pb-3 pl-8 pr-8 lg:pl-10 lg:pr-10">
        <button
          className="flex flex-col items-center gap-1"
          onClick={trailersClicked}
        >
          <Users />
          <span>Trailers</span>
        </button>
        <button
          className="flex flex-col items-center gap-1"
          onClick={chatClicked}
        >
          <MessageSquare />
          <span>Chat</span>
        </button>
        <button
          className="flex flex-col items-center gap-1"
          onClick={copyRoomID}
        >
          <Clipboard />
          {copy ? <span>Copied</span> : <span>Room ID</span>}
        </button>
      </div>
      {chatModalOpen && (
        <div className="bg-none justify-center flex flex-row items-center border-2 border-slate-200 mx-auto fixed inset-0 z-50 gap-10 pt-3 pb-3 pl-10 pr-10">
          <div className="bg-white backdrop-blur-3xl rounded-lg shadow-lg flex flex-col justify-between min-w-72 w-1/2 min-h-96 h-1/2">
            <div className="justify-end flex items-center border-b-2 p-5">
              <button onClick={chatClicked}>
                <X />
              </button>
            </div>
            <div className="h-[90%] space-y-10 p-5 overflow-y-auto">
              {messages.map((message, index) =>
                message.id !== socket.id ? (
                  <div
                    key={index}
                    className="flex flex-col items-start space-y-1"
                  >
                    <h1 className="ml-1">{message.username}</h1>
                    <p className="text-base text-center bg-slate-200 rounded-md max-w-lg px-3 py-2">
                      {message.value}
                    </p>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="flex flex-col items-end space-y-1"
                  >
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
      )}
      {trailersModalOpen && (
        <div className="bg-none justify-center flex flex-row items-center border-2 border-slate-200 mx-auto fixed inset-0 z-50 gap-10 pt-3 pb-3 pl-10 pr-10">
          <div className="bg-white backdrop-blur-3xl rounded-lg shadow-lg flex flex-col justify-between min-w-72 w-1/2 min-h-96 h-1/2">
            <div className="justify-end flex items-center border-b-2 p-5">
              <button onClick={trailersClicked}>
                <X />
              </button>
            </div>
            <ul className="text-xl text-black h-full space-y-3 p-5 overflow-y-auto">
              {connectedUsers.map((connectedUser, index) => (
                <li
                  key={index}
                  className="flex flex-row justify-between border-b border-slate-200 pb-2 pl-2"
                >
                  <p className="flex flex-row items-center">
                    <span className="rounded-full w-3 h-3 mr-3 bg-green-800"></span>
                    {connectedUser.username}
                  </p>
                  <p>5km</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomButtons;
