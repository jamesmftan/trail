import React from "react";
import TrailMap from "../components/TrailMap";
import BottomSection from "../components/BottomSection";

const MainPage = ({ socket }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative h-screen">
        <TrailMap socket={socket}></TrailMap>
        <BottomSection socket={socket}></BottomSection>
      </div>
    </>
  );
};

export default MainPage;
