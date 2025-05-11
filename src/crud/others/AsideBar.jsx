import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdAnnouncement, MdOutlineMenu } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosCreate } from 'react-icons/io';
import { GiArchiveRegister } from 'react-icons/gi';
import { PiStudentFill } from 'react-icons/pi';
import { IoDocumentText, IoStatsChartSharp } from 'react-icons/io5';
import { AiOutlineSchedule } from 'react-icons/ai';
import { CgNotes } from 'react-icons/cg';
import { LiaUniversitySolid } from 'react-icons/lia';


const AsideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle the entire sidebar
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
   
    <>

    <section id='about' className='relative'>
      
    <button
  onClick={toggleSidebar}
  className="p-2 m-2 bg-blue-600 text-white rounded hover:bg-blue-500"
>
  {isSidebarOpen ? <MdOutlineMenu title='Discard Menu'/> : <MdOutlineMenu title='Show Menu'/> }
</button>

      
      
     
      {isSidebarOpen && (
        <aside className="bg-gray-800 text-white p-3 pt-10 w-full md:w h-auto md:h-screen shadow-lg -mt-12">
          <ul className="space-y-4">
         
          {/* <button
        onClick={toggleSidebar}
        className="p-2 m-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        {isSidebarOpen ? <MdOutlineMenu />: <MdOutlineMenu />}
      </button> */}

                

            <NavLink
              to="/register"
              title="Register"
              className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2">
              <GiArchiveRegister className="text-2xl" />
              <li className="text-lg font-semibold">REGISTER THE USERS</li>
            </NavLink>

            {/* <NavLink to="/map" title="Map"
                       id="Navbar"
                       className="flex items-center space-x-1 bg-green-500 text-white hover:text-blue-100">
                        
                         <FaMapMarkerAlt  className="text-2xl"/>
                         
                        <span className="hidden md:inline">Map</span>
                      </NavLink> */}

            <NavLink
              to="/create"
              title="Create student info"
              // className="block p-2 hover:bg-gray-700 rounded"
              className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2">
                        
          
              <IoIosCreate className="text-2xl"/>
              <li className="text-lg font-semibold">CREATE STUDENT</li>
            </NavLink>

            <NavLink
              to="/viewAllPersuing"
              title="View currently pursuing students"
               className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2"
            ><PiStudentFill className="text-2xl"/>
              <li className="text-lg font-semibold">PURSUING STUDENTS</li>
            </NavLink>

            <section className="mt-4">
              <button
                onClick={toggleDropdown}
                className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500 text-center"
              >
                {/* <IoIosArrowDropdown className="text-2xl"/> VIEW BY GROUPS */}

                <div className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-500">
                  <IoIosArrowDropdown className="text-2xl hover:bg-blue-500" />
                      <span className="text-lg font-medium hover:bg-blue-500">VIEW BY GROUPS</span>
                </div>
              </button>
              {isDropdownOpen && (
                <div className="mt-2 bg-gray-700 rounded p-3">
                  <NavLink  to="/ba1" title='ba1' className="block p-1 m-2 hover:bg-gray-600 rounded bg-red-600" > Ba-year-1 </NavLink>
                  
                  <NavLink to="/ba2" title='ba2' className="block p-1 m-2 hover:bg-gray-600 rounded bg-red-600" > Ba-year-2</NavLink>

                  <NavLink to="/ba3" title='ba3' className="block p-1 m-2 hover:bg-gray-600 rounded bg-red-600">Ba-year-3</NavLink>
                  {/* Add other NavLinks similarly */}


                  <NavLink to="/bcom1" title='bcom1' className="block p-1 m-2 hover:bg-gray-600 rounded bg-blue-400">Bcom-year-1</NavLink>
              
                  <NavLink to="/bcom2" title='bcom2' className="block p-1 m-2 hover:bg-gray-600 rounded bg-blue-400">Bcom-year-2</NavLink>
              
                  <NavLink to="/bcom3" title='bcom3' className="block p-1 m-2 hover:bg-gray-600 rounded bg-blue-400">Bcom-year-3</NavLink>
              
                  <NavLink to="/BscMpcs1" title='Mpcs1' className="block p-1 m-2 hover:bg-gray-600 rounded bg-green-400">Bsc-Mpcs-year-1</NavLink>
              
                  <NavLink to="/BscMpcs2" title='Mpcs2' className="block p-1 m-2 hover:bg-gray-600 rounded bg-green-400">Bsc-Mpcs-year-2</NavLink>
              

                  <NavLink to="/BscMpcs3" title='Mpcs3' className="block p-1 m-2 hover:bg-gray-600 rounded bg-green-400">Bsc-Mpcs-year-3</NavLink>
              
                  <NavLink to="/BscBzc1" title='Bzc1' className="block p-1 m-2 hover:bg-gray-600 rounded bg-yellow-400">Bsc-Bzc-year-1</NavLink>
              
                  <NavLink to="/BscBzc2" title='Bzc2' className="block p-1 m-2 hover:bg-gray-600 rounded bg-yellow-400">Bsc-Bzc-year-2</NavLink>
              
                  <NavLink to="/BscBzc3" title='Bzc3' className="block p-1 m-2 hover:bg-gray-600 rounded bg-yellow-400">Bsc-Bzc-year-3</NavLink>
              

                  <NavLink to="/BscMzc1" title='Mzc1' className="block p-1 m-2 hover:bg-gray-600 rounded bg-purple-700">Bsc-Mzc-year-1</NavLink>
              
                  <NavLink to="/BscMzc2" title='Mzc2' className="block p-1 m-2 hover:bg-gray-600 rounded bg-purple-700">Bsc-Mzc-year-2</NavLink>
              
                  <NavLink to="/BscMzc3" title='Mzc3' className="block p-1 m-2 hover:bg-gray-600 rounded bg-purple-700">Bsc-Mzc-year-3</NavLink>
              


                </div>
              )}
            </section>

            <NavLink
              to="/viewAll"
              title="View all students"
               className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2"
            ><PiStudentFill className="text-2xl"/>
              <li className="text-lg font-semibold">VIEW ALL STUDENT</li>
            </NavLink>

            <hr />

            <NavLink
           
            to={"/stats"} 
                className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2"
                title="Only Principal Sir Can Access"
                >               
                  <IoStatsChartSharp  className=" text-2xl " />
                  <li className="text-lg font-semibold">STATISTICS</li>                                               
                  </NavLink>

            <NavLink
              to="/announcement"
              title="Announcement to students"
               className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2">
                <MdAnnouncement  className="text-2xl"/>
              <li className="text-lg font-semibold">ANNOUNCEMENT</li>
            </NavLink>

            <NavLink
              to="/notice"
              title="Notice"
               className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2"
            ><IoDocumentText  className="text-2xl"/>
              <li className="text-lg font-semibold">NOTICE</li>
            </NavLink>

            <NavLink
              to="/CreateTimeTable"
              title="time-table"
               className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2"
            ><AiOutlineSchedule  className="text-2xl"/>
              <li className="text-lg font-semibold">CREATE-TIME-TABLE</li>
            </NavLink>

            <NavLink
              to="/notes"
              title="notes"
               className="flex items-center space-x-1 text-white hover:bg-gray-700 p-2"
            ><CgNotes  className="text-2xl"/>
              <li className="text-lg font-semibold">CREATE-NOTES</li>
            </NavLink>
          </ul>
        </aside>
      )}
    </section>
    </>
  );
};

export default memo(AsideBar);


//completed on 25/12/2024
