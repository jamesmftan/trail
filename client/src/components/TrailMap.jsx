import React, { useState, useEffect } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

const TrailMap = ({ socket }) => {
  const [trail, setTrail] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setTrail(position);
        socket.emit("user", {
          id: socket.id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );

    socket.on("userList", (users) => {
      setConnectedUsers(users);
    });

    socket.on("disconnected", (connectedUsers) => {
      setConnectedUsers(connectedUsers);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [socket]);
  return (
    <div className="flex col-span-2">
      {trail && (
        <Map
          className="h-full w-full"
          defaultCenter={[trail.coords.latitude, trail.coords.longitude]}
          defaultZoom={18}
          maxZoom={20}
          minZoom={10}
        >
          <ZoomControl />
          {connectedUsers.map((user, index) => (
            <Marker
              key={index}
              width={50}
              anchor={[user.latitude, user.longitude]}
            />
          ))}
        </Map>
      )}
    </div>
  );
};

export default TrailMap;
