import React from "react";
import { Users, MessageSquare, Clipboard } from "lucide-react";

const BottomButtons = ({
  connectedUsers,
  chatNotifications,
  trailersClick,
  chatClick,
  copyRoomID,
  copy,
}) => {
  return (
    <div className="text-slate-700 text-center font-normal bg-slate-200 opacity-[80%] backdrop-blur-3xl justify-center flex flex-row items-center rounded-full border-2 border-white fixed bottom-5 z-50 gap-10 pt-3 pb-3 pl-8 pr-8 lg:pl-10 lg:pr-10">
      <button
        className="flex flex-col items-center gap-1"
        onClick={trailersClick}
      >
        <span className="text-sm text-slate-200 bg-slate-700 rounded-full fixed bottom-[3.3rem] ml-[2.5rem] -z-50 h-5 w-5">
          {connectedUsers.length}
        </span>
        <Users color="#334454" />
        <span>Trailers</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={chatClick}>
        {chatNotifications.length > 0 && (
          <span className="text-sm text-slate-200 bg-red-500 rounded-full fixed bottom-[3.3rem] ml-[2.8rem] -z-50 h-5 w-5 animate-pulse">
            {chatNotifications.length}
          </span>
        )}
        <MessageSquare color="#334454" />
        <span>Chat</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={copyRoomID}>
        <Clipboard color="#334454" />
        {copy ? <span>Copied</span> : <span>Room ID</span>}
      </button>
    </div>
  );
};

export default BottomButtons;
