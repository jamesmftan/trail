import React, { useState, useEffect } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

const TrailMap = ({ socket }) => {
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("location", { id: socket.id, latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );

    socket.on("userLocation", (userLocation) => {
      setUserLocations(userLocation);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("userLocation");
    };
  }, [socket]);

  return (
    <>
      <div className="text-black text-center font-normal bg-white opacity-[80%] backdrop-blur-3xl justify-center flex flex-row items-center rounded-full border-2 border-slate-200 fixed top-5 z-50 gap-10 pt-3 pb-3 pl-8 pr-8 lg:pl-20 lg:pr-20">
        <p>Latitude: 0</p>
        <p>Longitude: 0</p>
      </div>
      <Map
        className="h-full w-full"
        center={[53, 22]}
        defaultZoom={18}
        maxZoom={20}
        minZoom={10}
      >
        {userLocations.map((location) => (
          <Marker
            key={location.id}
            width={50}
            anchor={[location.latitude, location.longitude]}
          />
        ))}
      </Map>
    </>
  );
};

export default TrailMap;
