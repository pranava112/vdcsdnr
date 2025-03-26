import React, { memo, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Slider.css'; // Import custom CSS for additional styling

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const slides = [
    {
      img: "../banner.jpeg",
      title: "First Slide Label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPh_wEl4kGjzHk5XthtSIhBcH1DgG-FRsMaA&s",
      title: "First Slide Label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    
    {
      img:"data:image/jpeg;base64,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",
      title: "First Slide Label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
      img: "data:image/png;base64,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",
      title: "Second Slide Label",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0a528CQqejDjMZMmlaDv4IgrGNl54sPOVWA&s",
      title: "Third Slide Label",
      description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYC3Ukrkhc8vDXFUvaa8owAIu7zdJPKijqQ&s",
        title: "Third Slide Label",
        description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."
      },



      
  ];

  const handleBackword = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleForward = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Carousel onSelect={handleSelect} data-bs-theme="dark" className="relative w-full max-w-3xl mx-auto overflow-hidden">
    {/* <div className="relative w-full max-w-3xl mx-auto overflow-hidden"> */}
      {/* Slide */}
      
      {/* <div */}
      <Carousel.Item
        className="flex transition-transform duration-500"
         id='slider'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 object-center"
             
             />
            
            {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
              <h5 className="text-lg font-bold">{slide.title}</h5>
              <p>{slide.description}</p>
            </div> */}
          </div>
        ))}
      </Carousel.Item>

      {/* Controls */}
      <button
        onClick={handleBackword}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        &#8592;
      </button>
      <button
        onClick={handleForward}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        &#8594;
        
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </Carousel>
    
  );
}

export default memo(Slider);

//completed on 13/01/2025