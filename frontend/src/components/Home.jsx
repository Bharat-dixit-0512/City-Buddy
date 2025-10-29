import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const slides = [
  "/cityWallpaper.jpg",
  "https://w0.peakpx.com/wallpaper/371/290/HD-wallpaper-blue-neon-city-landscape.jpg",
  "/cityWallpaper2.jpg",
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Slideshow Container */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${slide}')`,
            }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Text Content */}
        <div className="relative z-10 text-center text-white px-6 md:px-20">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-[#FFD60A] [text-shadow:_0_0_10px_rgba(255,214,10,0.5)]">
            Discover Your Next <br />{" "}
            <span className="animate-pulse text-[#FF7B54]">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-[#F9FAFB]/90">
            Discover trusted stays, charming cafés, and must-see attractions—
            CityBuddy curates your perfect journey.
          </p>
          <NavLink to="/all">
            <button className="cursor-pointer bg-[#FF7B54] hover:bg-[#E85D04] text-white font-semibold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(255,123,84,0.5),0_0_30px_rgba(255,123,84,0.4)] hover:shadow-[0_0_20px_rgba(255,123,84,0.7),0_0_40px_rgba(255,123,84,0.6)] transition-all duration-300">
              Start Exploring
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;