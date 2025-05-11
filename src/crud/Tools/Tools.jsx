import React, { memo, useEffect } from 'react';
import { AiFillCalculator } from 'react-icons/ai';
import { IoBookSharp } from 'react-icons/io5';
import { PiClockCounterClockwiseBold } from 'react-icons/pi';
import { SiDictionarydotcom } from 'react-icons/si';
import { SlCalender } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';

const Tools = () => {

  useEffect(()=>{
      document.title="Tools"
    })

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col w-auto ml-28 items-center p-6">
      
      <h1 className="text-3xl font-bold mb-8">Tools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 m-8 w-full max-w-10xl">


      <NavLink
          to="/tools/calendar"
          className="bg-black p-6 shadow-md rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          // title="calendar"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Calendar</span> 
            
            <SlCalender className="text-blue-500 text-2xl"/>
          </div>
         
        </NavLink>

        <NavLink
          to="/tools/counter"
          className="bg-black p-6 shadow-md rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          // title="Counter"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Counter</span> 
            <PiClockCounterClockwiseBold className="text-blue-500 text-2xl" />
          </div>
         
        </NavLink>

        <NavLink
          to="/calculator"
          className="bg-black p-6 shadow-md rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
         // title="calculator"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Calculator</span> 
            
            <AiFillCalculator className="text-blue-500 text-2xl"/>
          </div>
         
        </NavLink>

        

      

        
        {/* //////////////////////////////////// */}

        <NavLink
          to="/dictionary"
          className="bg-black p-6 shadow-md rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          // title="Dictionary"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Dictionary</span> 
          
            
            <SiDictionarydotcom className="text-blue-500 text-2xl"/>
          </div>
         
        </NavLink>

        <NavLink
          to="/books"
          className="bg-black p-6 shadow-md rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          // title="Ebooks"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">E-Books</span> 
          
            <IoBookSharp className="text-blue-500 text-2xl"/>
          </div>
         
        </NavLink>

        

      </div>
    </div>
  );
};

export default memo(Tools);
