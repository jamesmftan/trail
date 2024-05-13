import React from "react";
import { X } from "lucide-react";
import { calculateDistance } from "../javascript/Distance";

const TrailersModal = ({
  socket,
  myLocation,
  trailersClick,
  connectedUsers,
}) => {
  connectedUsers.sort((a, b) => {
    const distanceA = calculateDistance(
      myLocation.latitude,
      myLocation.longitude,
      a.latitude,
      a.longitude
    );
    const distanceB = calculateDistance(
      myLocation.latitude,
      myLocation.longitude,
      b.latitude,
      b.longitude
    );
    return distanceA - distanceB;
  });
  return (
    <div className="bg-none justify-center flex flex-row items-center border-2 border-slate-200 mx-auto fixed inset-0 z-50 gap-10 pt-3 pb-3 pl-10 pr-10">
      <div className="bg-white backdrop-blur-3xl rounded-lg shadow-lg flex flex-col justify-between min-w-72 w-1/2 min-h-96 h-1/2">
        <div className="justify-end flex items-center border-b-2 p-5">
          <button onClick={trailersClick}>
            <X />
          </button>
        </div>
        <ul className="text-xl text-black h-full space-y-3 p-5 overflow-y-auto">
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
            return connectedUser.id === socket.id ? (
              <li
                key={index}
                className="flex flex-row justify-between border-b border-slate-200 pb-2 pl-2"
              >
                <p className="flex flex-row items-center">
                  <span className="rounded-full w-3 h-3 mr-3 bg-green-800"></span>
                  You
                </p>
              </li>
            ) : (
              <li
                key={index}
                className="flex flex-row justify-between border-b border-slate-200 pb-2 pl-2"
              >
                <p className="flex flex-row items-center">
                  <span className="rounded-full w-3 h-3 mr-3 bg-green-800"></span>
                  {connectedUser.username}
                </p>
                <p>{distance} KM</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TrailersModal;
