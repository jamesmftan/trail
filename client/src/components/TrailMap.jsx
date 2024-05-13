import React, { useState, useEffect } from "react";
import TopContent from "./TopContent";
import { calculateMidpoint } from "../javascript/CalculateMidpoint";
import { getRandomColor } from "../javascript/GetRandomColor";

import { Map, Marker, ZoomControl } from "pigeon-maps";
import { MapPin } from "lucide-react";

const TrailMap = ({ socket }) => {
  const [userLocations, setUserLocations] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [midPoint, setMidPoint] = useState(null);
  const color = getRandomColor();

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("location", {
        id: socket.id,
        username: "",
        color: color,
        latitude,
        longitude,
      });
      setMyLocation({ latitude, longitude });
    });

    socket.on("userLocation", (userLocations) => {
      setUserLocations(userLocations);
      if (userLocations.length > 0) {
        const latitudes = userLocations.map((location) => location.latitude);
        const longitudes = userLocations.map((location) => location.longitude);
        const midpoint = calculateMidpoint(latitudes, longitudes);
        setMidPoint(midpoint);
      }
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("userLocation");
    };
  }, [socket]);

  return (
    <>
      {midPoint && (
        <>
          <TopContent myLocation={myLocation} />
          <Map
            className="h-full w-full"
            limitBounds="edge"
            center={[midPoint.latitude, midPoint.longitude]}
            defaultZoom={3}
            minZoom={3}
            maxZoom={20}
          >
            {userLocations.map((location) => (
              <Marker
                key={location.id}
                width={50}
                anchor={[location.latitude, location.longitude]}
              >
                {location.id === socket.id ? (
                  <div className="flex flex-col items-center">
                    <span className="text-black font-bold bg-slate-200 opacity-[80%] backdrop-blur-3xl rounded-md border-2 border-white px-2 py-3">
                      You
                    </span>
                    <MapPin
                      size={60}
                      fill={location.color}
                      color="white"
                      strokeWidth={1}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-black font-bold bg-slate-200 opacity-[80%] backdrop-blur-3xl rounded-md border-2 border-white px-2 py-3">
                      {location.username}
                    </span>
                    <MapPin
                      size={60}
                      fill={location.color}
                      color="white"
                      strokeWidth={1}
                    />
                  </div>
                )}
              </Marker>
            ))}
          </Map>
        </>
      )}
    </>
  );
};

export default TrailMap;
