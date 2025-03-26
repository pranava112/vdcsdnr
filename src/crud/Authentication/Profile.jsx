import axios from 'axios';
import React, { useState, useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import Api from '../others/Api';

const Profile = () => {
  const [login, setLogin] = useState({
    token: uuidv4(),
    uname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [userData, setUserData] = useState(null);

  const { email, token, uname, mobile, password } = login;

  const getApi = async () => {
    try {
      const response = await Api.get(`/register`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      
      const filteredValue = data.filter(
        (val) => val.email === login.email && val.password === login.password
      );

      if (filteredValue.length > 0) {
        const userDetails = {
          token,
          uname: filteredValue[0].uname,
          mobile: filteredValue[0].mobile,
          email: filteredValue[0].email,
        };

        localStorage.setItem("USER_DATA", JSON.stringify(userDetails));
        setUserData(userDetails);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("USER_DATA");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      localStorage.removeItem("USER_DATA");
      setUserData(null);
      navigate("/logout");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <section id='profile' className="min-h-48 bg-gray-100 dark:bg-gray-900 flex   justify-center items-center p-4 m-20">
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">User Profile</h2>
          {userData ? (
            <div className="space-y-4 text-gray-700 dark:text-gray-300 profile">
              <p><strong>Username:</strong> {userData.uname}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Mobile:</strong> {userData.mobile}</p>
              <button
                title="Logout"
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-500 dark:text-gray-400">No user is logged in.</p>
              <button
                title="Login"
                onClick={handleLoginRedirect}
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
              >
                Login
              </button>
            </div>
          )}


        </div>
      </section>
    </>
  );
};

export default Profile;
