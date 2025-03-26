import React, { memo, useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <>
      <section id='about' className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">VIGNAN DEGREE COLLEGE</h2>
          <p className="text-lg text-gray-600 mb-4">Nagulapally Road, Shadnagar-509216, RR Dist</p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">College Code: 3021</h3>
          <h3 className="text-lg font-semibold text-gray-700">Contact No: 9705014145</h3>
        </div>


          <h1 id='hhh' className='text-3xl font-bold text-black mt-4 '> About College </h1>
          
        <p className="mt-4 leading-relaxed max-w-8xl text-center p-3 m-8 bg-slate-300 text-violet-800 rounded-lg">
    Vignan Degree College, Shadnagar, located in Telangana, is a renowned educational institution and was established in the year 2005.
    The institute offers a wide range of Degree programmes at UG level. These courses are offered across various fields, including Humanities & Social Sciences and Science.
    Some of the most popular programmes offered at the institute are BCOM, B.A., and B.Sc. The institute strives to provide quality education to students at an affordable 
    fee to make it accessible for meritorious students.The institute has a group of experienced and professional faculty members to offer valuable education to students. 
    In addition, the institute campus offers a modern infrastructure to students and caters to all their needs.
      </p>        

        <br />


        <section id='heading1' className="container mx-auto bg-gray-300 text-white rounded-lg mb-8 text-center p-10">
          <h1 id='heading1' className="text-2xl font-bold text-black mb-5 ">Labs</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-100 rounded-md">
  
  <div>
  <img 
    src="../public/computer lab.jpg" 
    alt="Image 2" 
    className="w-full min-h-72 rounded-lg shadow-md"
  />
  <p id='data' className='text-2xl'>Computer Lab</p>
  </div>
  

<div>
<img 
    src="../public/chemistry lab.jpg" 
    alt="Image 2" 
    className="w-full min-h-72 rounded-lg shadow-md "
  />
  <p id='data' className='text-2xl'>Chemistry Lab</p>
</div>

<div>
<img 
    src="../public/physics lab.jpg" 
    alt="Image 2" 
    className="w-full min-h-72 rounded-lg shadow-md "
  />
  <p id='data' className='text-2xl'>Physics Lab</p>
</div>

<div>
<img 
    src="../public/botony lab.jpg" 
    alt="Image 2" 
    className="w-full min-h-72 rounded-lg shadow-md "
  />
  <p id='data' className='text-2xl'>Botony Lab</p>
</div>

<div>
<img 
    src="../public/zoology-lab.webp" 
    alt="Image 2" 
    className="w-full min-h-72 rounded-lg shadow-md border-none"
  />
<p id='data' className='text-2xl'>Zoology Lab</p>
</div>
  </div>
  </section>
        

        <section id='heading1' className="container mx-auto bg-gray-300 text-white rounded-lg mb-8 text-center p-10">
          <h1 id='heading1' className="text-2xl font-bold text-black mb-5 ">Images</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-100 rounded-md">
  
  <img 
    src="../public/vignan1.jpeg" 
    alt="Image 2" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />

<img 
    src="../public/management.webp" 
    alt="Image 3" 
    className="w-full max-h-80 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />

  
  <img 
    src="../public/staff2.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />
  

  

  <img 
    src="../public/flaghasting.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />

<img 
    src="../public/teachersday.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />

  
<img 
    src="../public/staff.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />

<img 
    src="../public/staff1.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />

  <img 
    src="../vignan3.jpeg" 
    alt="Image 1" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />



<img 
    src="../public/college.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />



<img 
    src="../public/news.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />

<img 
    src="../public/player.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />






<img 
    src="../public/students.webp" 
    alt="Image 3" 
    className="w-full max-h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
  />






  
</div>

       
        </section>


      </section>

 

    </>
  );
};

export default memo(About);
