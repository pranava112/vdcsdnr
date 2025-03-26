import React from "react";
import { Navigate } from "react-router-dom";

const AdminRouting = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("USER_DATA"));

  // Define the list of allowed users
  const allowedUsers = [
    { email: "VadlaBhavaniShankar@gmail.com" },
    { email: "AdminVignanDegreeCollege@gmail.com" },
  ];

  // Check if the user is allowed
  const isAuthorized = userData && allowedUsers.some(
    (user) => user.email === userData.email
  );

  // Redirect unauthorized users
  if (!isAuthorized) {
    return <Navigate to="/students" replace />;
  }

  // Render children for authorized users
  return children;
};

export default AdminRouting;
