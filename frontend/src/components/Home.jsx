import React from "react";
import { NavLink } from "react-router-dom";


const Home = () => {
  return (
    <div className="min-h-screen bg-cyan-50">

      {/* Hero Section with Background Image */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://t4.ftcdn.net/jpg/07/24/54/37/360_F_724543702_X6g0dRWzWtEFPWXoiHAzXwZWnG3xKLxp.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Content */}
        <div className="relative z-10 text-center text-white px-6 md:px-20">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Discover Your Next <br /> Adventure
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto drop-shadow-md">
            Discover trusted stays, charming cafés, and must-see attractions—
            CityBuddy curates your perfect journey.
          </p>
          <NavLink to='/all'><button className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full hover:shadow-[0_0_10px_rgba(59,130,246,0.5),0_0_20px_rgba(96,165,250,0.4),0_0_40px_rgba(147,197,253,0.3)] transition-all duration-300 ">
            Start Exploring
          </button></NavLink>
        </div>
      </div>

      
    </div>
  );
};

export default Home;
