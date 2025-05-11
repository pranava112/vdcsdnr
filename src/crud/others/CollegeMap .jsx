import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

const CollegeMap = () => {
  const mapRef = useRef(null); // Reference to the map container
  const [map, setMap] = useState(null); // Store the map instance

  // Coordinates for the college
  const collegeLocation = [17.0711011, 78.2032401];

  useEffect(() => {
    // Initialize the map once the component is mounted
    const mapInstance = L.map(mapRef.current).setView(collegeLocation, 13);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    // Add a marker for the college location
    L.marker(collegeLocation).addTo(mapInstance).bindPopup(
        "<b>Vignan Degree College</b><br />Nagulapally road Shadnagar."
    );

    // Store the map instance in state
    setMap(mapInstance);

    // Cleanup the map on component unmount
    return () => {
      mapInstance.remove();
    };
  }, []);

  // Function to get the user's current position and navigate to the college location
  const navigateToCollege = () => {
    if (map) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          // Center the map to the user's location
          map.setView(userLocation, 13);

          // Add a marker for the user's current location
          L.marker(userLocation).addTo(map).bindPopup("Your current location");

          // Use routing machine to create a route from user's location to the college location
          L.Routing.control({
            waypoints: [
              L.latLng(userLocation),
              L.latLng(collegeLocation),
            ],
            routeWhileDragging: true,
          }).addTo(map);
        },
        (error) => {
          alert("Error getting your location: " + error.message);
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  {/* Button to navigate to the college from the user's location */}
  <button
  onClick={navigateToCollege}
  className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative"
  data-title="Navigate"
>
    Navigate to Vignan Degree College
    <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
    Navigate
  </span>
  </button>

  <div
    ref={mapRef}
    className="w-full h-3/4 md:w-11/12 lg:w-9/12"
    style={{
      height: "100vh", // Make the map take up the full height of the viewport
      width: "100vw", // Make the map take up the full width of the viewport
    }}
  />
</div>
  );
};

export default CollegeMap;
