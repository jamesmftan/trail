import React from "react";

const TopContent = ({ myLocation }) => {
  return (
    <div className="text-black text-center font-normal bg-slate-200 opacity-[80%] backdrop-blur-3xl justify-center flex flex-row items-center rounded-full border-2 border-white fixed top-5 z-50 gap-3 lg:gap-5 pt-3 pb-3 pl-5 pr-5 lg:pl-10 lg:pr-10">
      <p>Latitude: {Math.round(myLocation.latitude * 1000) / 1000}</p>
      <p>Longitude: {Math.round(myLocation.longitude * 1000) / 1000}</p>
    </div>
  );
};

export default TopContent;
