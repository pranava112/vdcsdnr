import React, {  useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHome, IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FaInstagram, FaMapMarkerAlt, FaUserTie,  } from "react-icons/fa";
import toast from "react-hot-toast";


const Navbar = () => {
  const [user, setUser] = useState(null); // Stores logged-in user details
  const [isLoading, setIsLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();

  const getApi = async () => {
   try {
      const { data } = await axios.get("http://localhost:5000/register");
      console.log("Fetched Users:", data);
  
      const filteredValue = data.filter(
        (val) => val.email === login.email && val.password === login.password
      );
  
      if (filteredValue.length > 0) {
        console.log("User Found:", filteredValue[0]);
        navigate("/students");
        localStorage.setItem("TOKEN", token);
        toast.success("Successfully logged in!");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    document.title = "VIGNAN DEGREE COLLEGE";
    getApi(); // Fetch user data on component mount
  }, []);

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back
  };

  // dark theme
  
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
    useEffect(() => {
      if (theme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
  

  return (
    <>

       <aside  className="bg-blue-400 nav mt-2 text-white p-4 shadow-md flex flex-col md:flex-row items-center justify-center ">
        
        <div id="icons" className="flex space-x-9 items-center">

       {/* <input type="color" /> */}
          
          <NavLink to="/" 
          // title="home"
          id="Navbar"
           className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative">
           
            <IoHome className="text-2xl"/>
            {/* HOME */}
    <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
    Home
  </span>
          </NavLink>
        

          
          

          {/* <NavLink to="/login" title="login"
           id="Navbar"
          className="flex items-center space-x-1 text-white hover:text-blue-100">
           
            <IoLogIn className="text-2xl"/>
            <span className="hidden md:inline">LOGIN</span>
          </NavLink> */}

          <NavLink to="/profile" 
           id="Navbar"
           className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative">
           
            <CgProfile className="text-2xl"/>
            {/* USER */}
              <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
              Profile
  </span>
          </NavLink>

          {/* <NavLink to="/instagram"
           id="Navbar"
           className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative">
           
             <FaInstagram className="text-2xl"/>
          
            <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
          Instagram
        </span>
          </NavLink>*/}

          {/* ////////////////////////////////////// */}

          {/* <NavLink to="/whatsapp" 
           id="Navbar"
           className="flex items-center space-x-1 bg-green-500 text-white hover:text-blue-100">

             
             <FaWhatsapp className="text-2xl"/>
             
            <span className="hidden md:inline">WHATSAPP</span>
          </NavLink> */}


        <button
          onClick={toggleTheme}
           id="Navbar"
           className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative"
        >
          {theme === "light" ? (
            <>
              <MdDarkMode className="text-2xl"  />
              {/* DARK */}
              <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
    Dark
  </span>
            </>
          ) : (
            <>
              <CiLight className="text-2xl " />
            {/* LIGHT */}
              <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
    Light
  </span>
            </>
          )}
        </button>


        <NavLink to="/portfolio" 
         id="Navbar"
         className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative">
           

             <FaUserTie className="text-2xl"/>
             
           {/* DEVELOPER */}
           <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
    Developer
  </span>
          </NavLink>


          <NavLink to="/map" 
           id="Navbar"
           className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative">
           
            
             <FaMapMarkerAlt  className="text-2xl"/>
             
            {/* MAP */}
            <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
    Map
  </span>
          </NavLink>

          


          <button
          
          id="Navbar"
           onClick={handleBackButtonClick}
           
           className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative">
          
         
           <IoArrowBackCircle className="text-2xl" />
          {/* BACK */}
          <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
    Back
  </span>
         </button>

         


      
        </div>
      </aside>
    </>
  );
};

export default Navbar;
