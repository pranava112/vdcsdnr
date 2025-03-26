import React from "react";
import { Navigate } from "react-router-dom";

const RestrictedRouting = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("USER_DATA"));
  const allowedUser = "VadlaBhavaniShankar@gmail.com";
  const password="242526";

  if (!userData || userData.email !== allowedUser && userData.password !==password) {
    return <Navigate to="/students" replace />;
  }

  return children;
};

export default RestrictedRouting;