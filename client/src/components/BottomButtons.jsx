import React from "react";
import { Users, MessageSquare, Clipboard } from "lucide-react";

const BottomButtons = ({ trailersClick, chatClick, copyRoomID, copy }) => {
  return (
    <div className="text-black text-center font-normal bg-slate-200 opacity-[80%] backdrop-blur-3xl justify-center flex flex-row items-center rounded-full border-2 border-white fixed bottom-5 z-50 gap-10 pt-3 pb-3 pl-8 pr-8 lg:pl-10 lg:pr-10">
      <button
        className="flex flex-col items-center gap-1"
        onClick={trailersClick}
      >
        <Users />
        <span>Trailers</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={chatClick}>
        <MessageSquare />
        <span>Chat</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={copyRoomID}>
        <Clipboard />
        {copy ? <span>Copied</span> : <span>Room ID</span>}
      </button>
    </div>
  );
};

export default BottomButtons;
