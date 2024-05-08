import React, { useState, useEffect } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

const TrailMap = ({ socket }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log("New position:", position.coords);
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="flex flex-col col-span-2">
      {userLocation && (
        <>
          <div className="text-white text-2xl p-5">
            <p>Latitude: {userLocation.latitude}</p>
            <p>Longitude: {userLocation.longitude}</p>
          </div>
          <Map
            className="h-full w-full"
            center={[userLocation.latitude, userLocation.longitude]}
            defaultZoom={18}
            maxZoom={20}
            minZoom={10}
          >
            <ZoomControl />
            <Marker
              width={50}
              anchor={[userLocation.latitude, userLocation.longitude]}
            />
          </Map>
        </>
      )}
    </div>
  );
};

export default TrailMap;
