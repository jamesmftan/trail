import React from "react";
import ExitButton from "../components/ExitButton";
import TrailMap from "../components/TrailMap";
import BottomSection from "../components/BottomSection";

const MainPage = ({ socket }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative h-screen">
        <ExitButton />
        <TrailMap socket={socket} />
        <BottomSection socket={socket} />
      </div>
    </>
  );
};

export default MainPage;
