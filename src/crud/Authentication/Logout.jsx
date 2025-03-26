import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from localStorage
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER_DATA");

        // Show a logout success message
        toast.success("You have successfully logged out.");

        // Redirect to the login page
        navigate("/login");
    }, [navigate]);

    return null; // Optionally, you can return a loading spinner or a simple message
};

export default Logout;
