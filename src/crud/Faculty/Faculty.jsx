import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from "../others/Api";

const Faculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Api.get(`/student/${id}`);

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/api/vignan/faculties") // Adjust the API endpoint as needed
    Api.get(`/faculties`)
      .then((response) => {
        setFaculties(response.data || []); // Ensure `faculties` is an array
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching faculties:", err);
        setError("Failed to fetch faculty data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto my-8 text-center">
        <p className="text-xl font-bold text-gray-800">Loading faculty data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto my-8 text-center">
        <p className="text-xl font-bold text-red-600">{error}</p>
      </div>
    );
  }

  if (faculties.length === 0) {
    return (
      <div className="container mx-auto my-8 text-center">
        <p className="text-xl font-bold text-gray-800">No faculty data available.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto my-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8  faculty">
      {faculties.map((faculty) => (
        <div
          key={faculty.id}
          className="faculty bg-gray-50 p-8 py-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-100"
        >
          <div className="container mx-auto flex p-8 flex-col items-center bg-gray-200">
            <img
              src={`data:image/jpeg;base64,${faculty.imageFile || ""}`}
              alt={faculty.name || "Faculty"}
              className="animated-border-image w-full max-h-72 rounded-lg shadow-md object-cover mb-6"
              onError={(e) => (e.target.src = "/default.png")} // Fallback to default image
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-4 ">
              {faculty.designation || "Designation"}: {faculty.name || "Name"}
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-xs">
              <b>
                Mobile: {faculty.mobile || "N/A"}
                <br />
                Subject: {faculty.subject || "N/A"}
              </b>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Faculty;
