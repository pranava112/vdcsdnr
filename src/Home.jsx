import { FaChalkboardTeacher, FaYoutube } from "react-icons/fa";
import React, { useEffect, useState } from 'react';

import { AiOutlineSchedule } from "react-icons/ai"
import Api from './crud/others/Api';
import { BsPersonWorkspace } from 'react-icons/bs';
import { CgMoreR } from "react-icons/cg";
import { CgNotes } from "react-icons/cg";
import DisplayNotice from './Notices/DisplayNotice';
import { GrContactInfo } from "react-icons/gr";
import { IoStatsChartSharp } from "react-icons/io5";
import { LiaUniversitySolid } from 'react-icons/lia';
import { NavLink } from 'react-router-dom';
import PortFolio from './crud/others/PortFolio';
import Slider from './crud/others/Slider';
import axios from 'axios';

function Home() {
  let [info, setInfo] = useState("");
  

  let fetchData = async () => {
    // let { data } = await Api.get("http://localhost:4000/announcement/517a");
    const { data } = await Api.get('/announcements/1');
    setInfo(data);
  };

 

  useEffect(() => {

    document.title="Home"

    try {
      fetchData();
      
    } catch (e) {
      console.log(e);
    }
  }, []);


  

  




  return (
    <>
      <div id='heading' className="bg-gray-100 m-8">

        
        
        {/* <section id='heading1' className=" bg-gray-300 text-white py-4 m-8"> */}
        <section id='heading1' className="bg-gray-300 text-white py-4 m-8 container mx-auto my-8  gap-8">
          <h3 className=" text-black text-center text-xl font-bold">ANNOUNCEMENT</h3>
          <marquee className=" text-black  text-center mt-2 text-lg" direction="left">{info.information}</marquee>
        </section>

        <section id='heading' className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-1 gap-8">
          
          <section  className="bg-slate-300  grid grid-cols-2 sm:grid-cols-8 gap-4 p-6 m-2">
           
            <NavLink to={"/students"}
            id='navigation'
             className="bg-white p-6 w-36 shadow-md rounded-lg hover:shadow-xl transition " title="office work">
              <div id='heading1'  className="flex items-center justify-between ">
                <span className="text-lg font-semibold">OFFICE</span>
                
                <BsPersonWorkspace id='icon' className="text-blue-500 text-2xl pr-1"/>
              </div>
            </NavLink>

            <NavLink id='heading1' to={"/faculty"} className="bg-white p-6  w-36 shadow-md rounded-lg hover:shadow-xl transition" title="Faculty">
              <div id='heading1' className="flex items-center justify-between">
                <span className="text-lg font-semibold">FACULTY</span>
                
                <FaChalkboardTeacher id='icon' className="text-blue-500 text-2xl pr-1" />
              </div>
            </NavLink>

          


            <NavLink
             to="/others/university"
              title="university" id='heading1'
              className="bg-white p-3 pt-6  w-36 shadow-md rounded-lg hover:shadow-xl transition ">
                          <div id='heading1' className='flex items-center justify-between'>
                          
                          <span className='text-lg font-semibold'>UNIVERSITY </span>
                          
                          <LiaUniversitySolid id='icon' className="text-blue-500 text-2xl pl-1"/>
                          </div>
                        </NavLink>

          <NavLink id='heading1' to={"/timetablestudent"} 
          className="bg-white p-3 pt-6  w-36 shadow-md rounded-lg hover:shadow-xl transition " title='Time-table'>
           <div id='heading1' className='flex items-center justify-between'>
            <span className='text-lg font-semibold'>SCHEDULE </span>
            <AiOutlineSchedule id='icon' className="text-blue-500 text-2xl pr-1"/>
           </div>
          </NavLink>

          {/* </section>

          <section  className="bg-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 m-2"> */}
           
            <NavLink id='heading1' to={"/notesforstudents"} title="Notes"  className="bg-white p-6  w-36 shadow-md rounded-lg hover:shadow-xl transition">
            <div id='heading1' className="flex items-center justify-between">
              <span className="text-lg font-semibold">NOTES</span>
              <CgNotes id='icon' className="text-blue-500 text-2xl pr-1" />
            </div>
            </NavLink>
            
            <NavLink id='heading1' to={"/tools"} className="bg-white p-6   w-36 shadow-md rounded-lg hover:shadow-xl transition" title="Tools">
              <div id='heading1' className="flex items-center justify-between">
                <span className="text-lg font-semibold">TOOLS</span>
                <CgMoreR id='icon' className="text-blue-500 text-2xl pr-1"/>
              </div>
            </NavLink>
            <NavLink id='heading1' to={"/about"} className="bg-white p-6  w-36 shadow-md rounded-lg hover:shadow-xl transition" title="About">
              <div id='heading1' className="flex items-center justify-between">
                <span className="text-lg font-semibold">ABOUT</span>
                <GrContactInfo id='icon' className="text-blue-500 text-2xl pr-1" />
              </div>
            </NavLink>

            <NavLink id='heading1' to={"/youtube"} className="bg-white p-3 pt-6  w-36 shadow-md rounded-lg hover:shadow-xl transition" title="Youtube">
              <div id='heading1' className="flex items-center justify-between">
                <span className="text-lg font-semibold">YOUTUBE</span>
                {/* <GrContactInfo className="text-blue-500 text-2xl" /> */}
                <FaYoutube id='icon' className="text-blue-500 text-2xl pr-1" />
              </div>
            </NavLink>

          </section>
        </section>

        <Slider/>
        
       

{/* /////////// img ///////// */}
      

<DisplayNotice/>


  {/* ////////////////////////////////////// */}

        <section id='heading1'  className="container mx-auto  bg-gray-300 p-8 shadow-lg rounded-lg mb-8 w-auto">
          
          {/* <h1 id='heading1' className='text-center text-2xl md:text-4xl p-4 font-bold underline'>Quotations</h1> */}
          <div id='' className="flex flex-col md:flex-row items-center rounded-lg">
            <img
              src="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww"
              alt="Education"
              className="w-full md:w-1/2 rounded-lg"
              id='imghome'
            />
            <p  className="mt-4 md:mt-0 md:ml-6 text-justify p-4">
              <q id='data'>THE FUNCTION OF EDUCATION IS TO TEACH ONE TO THINK INTENSIVELY AND TO THINK CRITICALLY. _ INTELLIGENCE PLUS CHARACTER - THAT IS THE GOAL OF TRUE EDUCATION.</q>
              <br />
              <b id='data'>-- Martin Luther King Jr.</b>
            </p>
          </div>
</section>

       
       
<section id='heading1' className="container mx-auto m-1  bg-gray-300 p-8 shadow-lg rounded-lg mb-8">

<h1 id='heading1' className='text-black text-center text-2xl md:text-4xl p-4 font-bold underline'>College History</h1>

<div id='heading1' className="flex flex-col md:flex-row items-center bg-stone-500 p-3">
  <p id='heading1' className="text-justify p-4 text-white">
    Vignan Degree College, Shadnagar, located in Telangana, is a renowned educational institution and was established in the year 2005.
    The institute offers a wide range of Degree programmes at UG level. These courses are offered across various fields, including Humanities & Social Sciences and Science.
    Some of the most popular programmes offered at the institute are BCOM, B.A., and B.Sc. The institute strives to provide quality education to students at an affordable fee to make it accessible for meritorious students.
    The institute has a group of experienced and professional faculty members to offer valuable education to students. In addition, the institute campus offers a modern infrastructure to students and caters to all their needs.
  
  </p>
 
  <img
    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrsWe9w4eRHJaGKn4ME6tNSS4toaKV2Wl8A&s"
    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI1hYI1iDTDXd_KjoysGzbns7a3pnOFL1ysA&s'
    alt="College"
    className="w-full mt-4 rounded-lg"
  />
  </div>
</section>

<section className='m-1 bg-gray-300 p-8 shadow-lg rounded-lg'>
  <p className='text-2xl text-black border-black p-8 m-4'>
  Welcome to [Vignan Degree College], where education meets excellence and dreams turn into reality. Our institution is dedicated to fostering knowledge, creativity, and innovation, ensuring that every student is equipped with the skills needed to thrive in the modern world.

We believe in holistic learning beyond textbooks where curiosity leads to discovery, hard work paves the way for success, and values build strong character. Whether you are here to pursue academics, explore new ideas, or develop lifelong skills, we are committed to guiding you every step of the way.

Strive for knowledge, aim for excellence, and embrace every challenge as an opportunity to grow. Remember, your journey here is not just about achieving grades but about transforming yourself into a leader of tomorrow.

<br /><b>Stay curious, stay inspired, and keep striving for greatness!</b>
  </p>
</section>

<PortFolio/>
        
      </div>
     
    </>
  );
}

export default Home;