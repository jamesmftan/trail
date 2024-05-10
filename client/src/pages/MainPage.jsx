import React from "react";
import Map from "../components/Map";
import Chat from "../components/Chat";

const Trail = ({ socket }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative h-screen">
        <Map socket={socket}></Map>
        <Chat socket={socket}></Chat>
      </div>
    </>
  );
};

export default Trail;
