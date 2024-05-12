import React, { useEffect, useState } from "react";
import ChatModal from "./ChatModal";
import TrailersModal from "./TrailersModal";
import BottomButtons from "./BottomButtons";

const BottomContent = ({ socket }) => {
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

  const messageClick = async () => {
    socket.emit("message", { messageValue, id: socket.id });
    setMessageValue("");
  };

  const trailersClick = () => {
    setTrailersModalOpen(!trailersModalOpen);
  };

  const chatClick = () => {
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
      <BottomButtons
        trailersClick={trailersClick}
        chatClick={chatClick}
        copyRoomID={copyRoomID}
        copy={copy}
      />
      {chatModalOpen && (
        <ChatModal
          socket={socket}
          messages={messages}
          messageValue={messageValue}
          messageChange={messageChange}
          messageClick={messageClick}
          chatClick={chatClick}
        />
      )}
      {trailersModalOpen && (
        <TrailersModal
          trailersClick={trailersClick}
          connectedUsers={connectedUsers}
        />
      )}
    </>
  );
};

export default BottomContent;
