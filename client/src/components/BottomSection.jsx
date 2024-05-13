import React, { useEffect, useState } from "react";
import ChatModal from "./ChatModal";
import TrailersModal from "./TrailersModal";
import BottomButtons from "./BottomButtons";

const BottomContent = ({ socket }) => {
  const [myLocation, setMyLocation] = useState(null);
  const [messageValue, setMessageValue] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatNotifications, setChatNotications] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [trailersModalOpen, setTrailersModalOpen] = useState(false);
  const [copy, setCopy] = useState(false);
  const roomID = connectedUsers[0]?.room;

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setMyLocation({ latitude, longitude });
    });

    socket.on("users", (usernameList) => {
      setConnectedUsers(usernameList);
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setChatNotications((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("users");
      socket.off("message");
    };
  }, [socket]);

  const messageChange = (event) => {
    setMessageValue(event.target.value);
  };

  const messageClick = () => {
    if (messageValue !== "") {
      socket.emit("message", { messageValue, id: socket.id });
      setMessageValue("");
    }
  };

  const enterKeyPress = (event) => {
    if (event.key === "Enter") {
      messageClick();
    }
  };

  const trailersClick = () => {
    setTrailersModalOpen(!trailersModalOpen);
  };

  const chatClick = () => {
    setChatModalOpen(!chatModalOpen);
    chatNotifications.length = 0;
  };

  if (chatModalOpen === true) {
    chatNotifications.length = 0;
  }

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
        connectedUsers={connectedUsers}
        chatNotifications={chatNotifications}
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
          enterKeyPress={enterKeyPress}
        />
      )}
      {trailersModalOpen && (
        <TrailersModal
          socket={socket}
          myLocation={myLocation}
          trailersClick={trailersClick}
          connectedUsers={connectedUsers}
        />
      )}
    </>
  );
};

export default BottomContent;
