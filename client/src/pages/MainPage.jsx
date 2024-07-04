import React, { useState, useEffect } from "react";
import ExitButton from "../components/ExitButton";
import TrailMap from "../components/TrailMap";
import BottomSection from "../components/BottomSection";
import ReturnToLoginPage from "./ReturnToLoginPage";

const MainPage = ({ socket, isConnected }) => {
  const [authentication, setAuthentication] = useState(null);

  useEffect(() => {
    socket.on("users", (users) => {
      const authenticatedUser = users.find((user) => user.id === socket.id);
      if (authenticatedUser) {
        setAuthentication(authenticatedUser);
      }
    });
    return () => {
      socket.off("users");
    };
  }, [socket]);

  if (!isConnected) return <ReturnToLoginPage />;

  return (
    <>
      {authentication?.id &&
      authentication?.username &&
      authentication?.room ? (
        <div className="flex flex-col justify-center items-center relative h-screen">
          <ExitButton socket={socket} />
          <TrailMap socket={socket} />
          <BottomSection socket={socket} />
        </div>
      ) : (
        <ReturnToLoginPage />
      )}
    </>
  );
};

export default MainPage;
