import React from "react";
import TrailMap from "../components/TrailMap";
import BottomButtons from "../components/BottomButtons";

const MainPage = ({ socket }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative h-screen">
        <TrailMap socket={socket}></TrailMap>
        <BottomButtons socket={socket}></BottomButtons>
      </div>
    </>
  );
};

export default MainPage;
