import React, { useState } from "react";
import { Users, MessageSquare, Clipboard } from "lucide-react";

const BottomButtons = ({
  connectedUsers,
  chatNotifications,
  trailersModalClick,
  chatModalClick,
}) => {
  const [copy, setCopy] = useState(false);
  const roomID = connectedUsers[0]?.room;
  const copyRoomID = () => {
    if (roomID) {
      navigator.clipboard.writeText(roomID).then(() => {
        setCopy(true);
        setTimeout(() => setCopy(false), 1000);
      });
    }
  };
  return (
    <div className="bg-slate-200 bg-opacity-20 backdrop-blur-3xl rounded-full shadow-lg border-2 border-white border-opacity-50 justify-center flex flex-row items-center fixed bottom-5 z-50 gap-10 pt-3 pb-3 pl-8 pr-8 lg:pl-10 lg:pr-10">
      <button
        className="flex flex-col items-center relative gap-1 transition-all duration-300 hover:scale-90"
        onClick={trailersModalClick}
      >
        <span className="text-sm text-white font-medium bg-slate-700 rounded-full absolute h-5 w-5 bottom-[2.4rem] ml-[2.5rem] -z-50">
          {connectedUsers.length}
        </span>
        <Users color="#334454" />
        <span className="text-slate-700 font-medium">Trailers</span>
      </button>
      <button
        className="flex flex-col items-center relative gap-1 transition-all duration-300 hover:scale-90"
        onClick={chatModalClick}
      >
        {chatNotifications.length > 0 && (
          <span className="text-sm text-white font-medium bg-red-500 rounded-full absolute h-5 w-5 bottom-[2.4rem] ml-[2.8rem] -z-50 animate-pulse">
            {chatNotifications.length}
          </span>
        )}
        <MessageSquare color="#334454" />
        <span className="text-slate-700 font-medium">Chat</span>
      </button>
      <button
        className="flex flex-col items-center gap-1 transition-all duration-300 hover:scale-90"
        onClick={copyRoomID}
      >
        <Clipboard color="#334454" />
        {copy ? (
          <span className="text-slate-700 font-medium">Copied</span>
        ) : (
          <span className="text-slate-700 font-medium">Room ID</span>
        )}
      </button>
    </div>
  );
};

export default BottomButtons;
