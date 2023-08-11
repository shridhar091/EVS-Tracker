
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

const StationLocation = (props) => {
  const [currentLocation, setCurrentLocation] = useState([props.data.latitude,props.data.longitude]);
  const containerStyle = {
    height: "100vh",
    width: "100%",
  };
  const stationMarkerIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/9357/9357947.png",
    iconSize: [30, 30],
  });


  return (
    <div>
       (
        <MapContainer
          style={containerStyle}
          center={currentLocation}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={currentLocation}
            icon={stationMarkerIcon}
          ></Marker>
        </MapContainer>
      )
    </div>
  )
}

export default StationLocation
