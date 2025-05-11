import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const PortFolio = () => {
  return (
    <>
      <section id='noti' className="bg-violet-900 text-white h-auto py-16 flex flex-col items-center justify-center m-5 rounded">
        <h1 className="text-3xl font-bold mb-8">Developer Profile</h1>
        <div id='portfolio' className="container mx-auto flex flex-col md:flex-row items-center gap-8 p-8 ">
          {/* Image Section */}
          <div className="flex-shrink-0 animate-fadeIn">
            {/* <img
              src="/img.jpg"
              alt="Profile"
              className="w-48 h-48 rounded-full border-4 border-white shadow-lg hover:scale-110 transform transition duration-500 ease-in-out"
            /> */}

        <img
      src="/myimg.jpg"
      alt="Profile"
      className="animated-border-image"
    />

          </div>

          {/* Text Section */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 text-black">V PRANAVA MANJUNATH</h1>
            <h2 className="text-2xl font-semibold text-black mb-4">Fullstack Java Developer</h2>
            <h3 className='text-black'>Contact :83090***** </h3>
           
            <p className="leading-relaxed max-w-xl text-black" id="port">
            <q>
            I am a Full Stack Java Developer with expertise in advanced Java, ReactJS, SQL, and web technologies. I am currently pursuing my MCA and have undergone extensive training as a Java developer.
            </q>
            </p>
            <br />
 
<div className="flex flex-col items-start space-y-4">
  <h5 className="text-lg font-semibold text-gray-800">Follow me on:</h5>
  <div className="flex space-x-4">
    <a
      href="https://www.instagram.com/pranava8520/"
      title="Instagram"
      target="_blank"
      className="hover:opacity-80 transition-opacity duration-300"
    >
      <img
        src="/insta.jpeg"
        alt="Instagram"
        className="w-8 h-8 rounded-full"
      />
    </a>
    <a
      href="https://www.linkedin.com/in/pranava-manjunath-134016313/"
      title="LinkedIn"
      target="_blank"
      className="hover:opacity-80 transition-opacity duration-300"
    >
      <img
        src="/linkedin.png"
        alt="LinkedIn"
        className="w-8 h-8 rounded-full"
      />
    </a>

    <a
      href="https://www.facebook.com/profile.php?id=100069232654181"
      title="Facebook"
      target="_blank"
      className="hover:opacity-80 transition-opacity duration-300"
    >
      <img
        src="
        data:image/jpeg;base64,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"
        
        alt="Facebook"
        className="w-8 h-8 rounded-full"
      />
    </a>
    
  </div>
</div>

              
          </div>
        </div>
      </section>
    </>
  );
};

export default PortFolio;


//completed on 18/01/2025