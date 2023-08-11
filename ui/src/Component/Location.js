
import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';

const Location = (props) => {
  const { geo } = props;
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const createCustomIcon = () => {
    return L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/5549/5549173.png',
      iconSize: [32, 32], // Set the size of the icon
      iconAnchor: [16, 32], // Set the anchor point of the icon (bottom center)
    })
  }

  useEffect(() => {
    // Initialize the map when the component mounts
    const newMap = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 10,
    });

    // Add a tile layer (you need to specify the URL of the tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);

    // Fetch the station current location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Create a marker for the Station's current location
        markerRef.current = L.marker([latitude, longitude], {
          icon: createCustomIcon(),
          draggable: true,
        }).addTo(newMap);

        // Set the view of the map to the Station's current location
        newMap.setView([latitude, longitude], 13);

        // Call the geo function with the initial latitude and longitude
        geo(latitude, longitude); //geo function from station component

        // Update the marker's position when it is dragged
        markerRef.current.on('dragend', () => {
          const latLng = markerRef.current.getLatLng();
          const latitude = latLng.lat;
          const longitude = latLng.lng;
          geo(latitude, longitude); //geo function from station component
        });

        // Add a click event listener to the map
        newMap.on('click', handleMapClick);

        // Save the map instance in the ref
        mapInstanceRef.current = newMap;
      },
      (error) => {
        // Handle error in fetching Station's location
        console.error('Error getting Station location:', error);
      }
    );

    // Clean up the map and marker when the component unmounts
    return () => {
      newMap.off('click', handleMapClick);
      newMap.remove();
      markerRef.current.remove();
    };
  }, []);

  const handleMapClick = (event) => {
    if (markerRef.current) {
      // Remove the previous marker if it exists
      mapInstanceRef.current.removeLayer(markerRef.current);
    }

    // Create a new marker at the clicked location and add it to the map
    markerRef.current = L.marker([event.latlng.lat, event.latlng.lng], {
      icon: createCustomIcon(),
      draggable: true,
    }).addTo(mapInstanceRef.current);

    // Call the geo function with the new latitude and longitude
    geo(event.latlng.lat, event.latlng.lng);
  };

  return <div id="map" style={{ width: '100%', height: '200px' }} ref={mapRef} />;
};

export default Location;
