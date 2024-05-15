import React, { useEffect, useState } from "react";
import BottomButtons from "./BottomButtons";
import ChatModal from "./ChatModal";
import TrailersModal from "./TrailersModal";

const BottomSection = ({ socket }) => {
  const [myLocation, setMyLocation] = useState(null);
  const [messageValue, setMessageValue] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatNotifications, setChatNotications] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [trailersModalOpen, setTrailersModalOpen] = useState(false);

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
      socket.emit("message", { messageValue });
      setMessageValue("");
    }
  };

  const trailersModalClick = () => {
    setTrailersModalOpen(!trailersModalOpen);
  };

  const chatModalClick = () => {
    setChatModalOpen(!chatModalOpen);
    chatNotifications.length = 0;
  };

  if (chatModalOpen === true) {
    chatNotifications.length = 0;
  }

  return (
    <>
      <BottomButtons
        connectedUsers={connectedUsers}
        chatNotifications={chatNotifications}
        trailersModalClick={trailersModalClick}
        chatModalClick={chatModalClick}
      />
      {chatModalOpen && (
        <ChatModal
          socket={socket}
          messages={messages}
          messageValue={messageValue}
          messageChange={messageChange}
          messageClick={messageClick}
          chatModalClick={chatModalClick}
        />
      )}
      {trailersModalOpen && (
        <TrailersModal
          socket={socket}
          myLocation={myLocation}
          trailersModalClick={trailersModalClick}
          connectedUsers={connectedUsers}
        />
      )}
    </>
  );
};

export default BottomSection;
