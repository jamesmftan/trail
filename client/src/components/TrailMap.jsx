import React, { useState, useEffect } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { MapPin } from "lucide-react";

const TrailMap = ({ socket }) => {
  const [userLocations, setUserLocations] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [randomFillColor, setRandomFillColor] = useState("#000000");

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("location", {
          id: socket.id,
          username: "",
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

    setRandomFillColor(getRandomColor());

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("userLocation");
    };
  }, [socket]);

  return (
    <>
      {myLocation && (
        <>
          <div className="text-black text-center font-normal bg-slate-200 opacity-[80%] backdrop-blur-3xl justify-center flex flex-row items-center rounded-full border-2 border-white fixed top-5 z-50 gap-10 pt-3 pb-3 pl-8 pr-8 lg:pl-20 lg:pr-20">
            <p>Latitude: {myLocation.latitude}</p>
            <p>Longitude: {myLocation.longitude}</p>
          </div>
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
                    fill={randomFillColor}
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
