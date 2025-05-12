import { NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Api from './crud/others/Api';
import { IoLogIn } from 'react-icons/io5'
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

const Header = () => {


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
      const { data } = await Api.get("/register");

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

  const [currentDate] = useState(new Date().toLocaleDateString());

  // const [time]=useState(new Date().toLocaleTimeString() );


  return (
    <>

      <aside  className="bg-white text-white w-auto p-4 shadow-md flex flex-col md:flex-row items-center justify-between">
            
             <div className="flex items-center mb-4 md:mb-0">
               <img
                //  src="https://yt3.googleusercontent.com/ytc/AIdro_mU5D_G08YZ0QedUAUyFvhEdmbkn-iojbIxdj5Po8MkqQ=s900-c-k-c0x00ffffff-no-rj"
                src="../college logo.png" 
                alt="logo"
                 className="w-16 h-16 rounded-full"
                 id='logo'
               />
             </div>
             
             <div  className="flex-1 text-center mb-4 md:mb-0  " >
               <h2 className="text-4xl p-34 font-bold text-black">VIGNAN DEGREE COLLEGE</h2>
               <p className="text-2xl p-34 font-bold text-black">SHADNAGAR</p>
             </div>

             {userData ? (
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              {/* <p><strong>Username:</strong> {userData.uname}</p> */}
              {/* <p><strong>Email:</strong> {userData.email}</p> */}
              {/* <p><strong>Mobile:</strong> {userData.mobile}</p> */}
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
              {/* <p className="text-gray-500 dark:text-gray-400">No user is logged in.</p> */}
              <button
                title="Login"
                onClick={handleLoginRedirect}
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
              >
                Login
              </button>
              
            </div>
          )}
          {/* <p className='text-black '> {currentDate}</p> */}
          

             
     </aside>

    </>
  )
}

export default Header;
