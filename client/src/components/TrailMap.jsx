import React, { useState, useEffect } from "react";
import TopContent from "./TopContent";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { MapPin } from "lucide-react";

const TrailMap = ({ socket }) => {
  const [userLocations, setUserLocations] = useState([]);
  const [myLocation, setMyLocation] = useState(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const color = getRandomColor();
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("location", {
          id: socket.id,
          username: "",
          color: color,
          latitude,
          longitude,
        });
        setMyLocation({ latitude, longitude });
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
      {myLocation && (
        <>
          <TopContent myLocation={myLocation} />
          <Map
            className="h-full w-full"
            center={[myLocation.latitude, myLocation.longitude]}
          >
            {userLocations.map((location) => (
              <Marker
                key={location.id}
                width={50}
                anchor={[location.latitude, location.longitude]}
              >
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
              </Marker>
            ))}
          </Map>
        </>
      )}
    </>
  );
};

export default TrailMap;
