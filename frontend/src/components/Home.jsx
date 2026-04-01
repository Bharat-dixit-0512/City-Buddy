import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cards from "./cards/Cards";
import Spinner from "./shared/Spinner";
import DetailsModal from "./DetailsModal";

const slides = [
  "/cityWallpaper.jpg",
  "https://w0.peakpx.com/wallpaper/371/290/HD-wallpaper-blue-neon-city-landscape.jpg",
  "/cityWallpaper2.jpg",
];
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeData, setHomeData] = useState({
    topRatedPlaces: [],
    newlyAddedPlaces: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    const fetchHomeData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/home`);
        setHomeData(res.data);
      } catch (error) {
        console.error("Failed to fetch homepage data");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#FFD60A]">
            Discover Your Next{" "}
            <span className="animate-pulse text-[#FF7B54]">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover trusted stays, charming cafés, and must-see
            attractions—CityBuddy curates your perfect journey.
          </p>
          <NavLink to="/restaurants">
            <button className="bg-[#FF7B54] hover:bg-[#E85D04] text-white font-semibold py-3 px-8 rounded-full shadow-lg">
              Start Exploring
            </button>
          </NavLink>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-16 px-4 space-y-16">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">
                Top Rated Places
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {homeData.topRatedPlaces.map((item) => (
                  <Cards
                    key={item._id}
                    item={item}
                    onItemClick={setSelectedItem}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">
                Newly Added
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {homeData.newlyAddedPlaces.map((item) => (
                  <Cards
                    key={item._id}
                    item={item}
                    onItemClick={setSelectedItem}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Home;
