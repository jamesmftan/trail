import React from "react";
import { X } from "lucide-react";
import { calculateDistance } from "../javascript/Distance";

const TrailersModal = ({
  socket,
  myLocation,
  trailersClick,
  connectedUsers,
}) => {
  return (
    <div className="bg-slate-700 bg-opacity-50 justify-center flex flex-row items-center mx-auto fixed inset-0 z-50 gap-10 pt-3 pb-3 pl-8 pr-8 lg:pl-10 lg:pr-10">
      <div className="bg-white backdrop-blur-3xl rounded-lg shadow-lg flex flex-col justify-between min-w-72 w-1/2 min-h-96 h-1/2">
        <div className="border-b-2 border-slate-200 justify-end flex items-center p-3">
          <button
            className="hover:bg-slate-200 rounded-[4px] px-3 py-2 transition-all duration-300"
            onClick={trailersClick}
          >
            <X color="#334454" />
          </button>
        </div>
        <ul className="h-full space-y-3 p-5 overflow-y-auto">
          <li className="border-b border-slate-200 pb-2 pl-2">
            <p className="text-xl text-slate-700 font-medium flex flex-row items-center">
              <span className="rounded-full w-3 h-3 mr-3 bg-green-800"></span>
              You
            </p>
          </li>
          {connectedUsers.map((connectedUser, index) => {
            const distance =
              Math.round(
                calculateDistance(
                  myLocation.latitude,
                  myLocation.longitude,
                  connectedUser.latitude,
                  connectedUser.longitude
                ) * 100
              ) / 100;
            return connectedUser.id !== socket.id ? (
              <li
                key={index}
                className="flex flex-row justify-between border-b border-slate-200 gap-5 pb-2 pl-2"
              >
                <p className="text-xl text-slate-700 font-medium flex flex-row items-center">
                  <span className="rounded-full w-3 h-3 mr-3 bg-green-800"></span>
                  {connectedUser.username}
                </p>
                <p className="text-xl text-slate-700 font-medium">
                  {distance} KM
                </p>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TrailersModal;
