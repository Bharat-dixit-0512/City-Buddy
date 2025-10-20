import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards"; 
import { X, Star, MapPin } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

function All() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cafesData, setCafesData] = useState([]);
  const [attractionsData, setAttractionsData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cafesRes, attractionsRes, restaurantsRes] = await Promise.all([
          axios.get(`${API_BASE}/cafes`),
          axios.get(`${API_BASE}/attractions`),
          axios.get(`${API_BASE}/restaurants`),
        ]);

        setCafesData(cafesRes.data || []);
        setAttractionsData(attractionsRes.data || []);
        setRestaurantsData(restaurantsRes.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sections = [
    { title: "Cafes", data: cafesData },
    { title: "Attractions", data: attractionsData },
    { title: "Restaurants & Resorts", data: restaurantsData },
  ];

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-black text-yellow-200/90 px-4 md:px-10 py-12 space-y-16">
      <div className="text-center mb-10 pt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-yellow-400 mb-4 [text-shadow:_0_0_10px_theme(colors.yellow.500)]">
          Explore India's Finest
        </h1>
        <p className="text-yellow-200/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
          Embark on a journey to discover the most enchanting cafes, breathtaking attractions, and luxurious restaurants across the vibrant landscapes of India.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-yellow-400 text-lg animate-pulse">Loading amazing places...</div>
      ) : error ? (
        <div className="text-center text-red-400 text-lg">{error}</div>
      ) : (
        sections.map((section, index) => (
          <div key={index} className="bg-gray-900/50 p-6 md:p-8 rounded-3xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8 pb-4 border-b-2 border-yellow-500/30">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
              {section.data.length > 0 ? (
                section.data.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    onClick={() => handleCardClick(item)}
                    className="cursor-pointer"
                  >
                    <Cards item={item} />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-yellow-200/70 text-lg py-10">
                  No {section.title.toLowerCase()} available at the moment.
                </p>
              )}
            </div>
          </div>
        ))
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-gray-900 rounded-3xl shadow-2xl shadow-yellow-500/20 border border-yellow-500/30 max-w-2xl w-full relative p-6 md:p-8">
            <button className="absolute top-4 right-4 text-yellow-400/80 hover:text-yellow-300" onClick={closeModal}>
              <X size={24} />
            </button>
            <img
              src={selectedItem.image || "https://via.placeholder.com/600x400"}
              alt={selectedItem.name}
              className="w-full h-72 object-cover rounded-2xl mb-6 shadow-md"
            />
            <h2 className="text-3xl font-extrabold text-yellow-300 mb-3">{selectedItem.name}</h2>
            <p className="text-yellow-200/90 text-base mb-4 leading-relaxed">{selectedItem.description}</p>
            <div className="flex items-center text-xl font-bold text-yellow-400 mb-2">
              <Star size={20} className="text-yellow-500 mr-2" fill="currentColor" />
              {selectedItem.rating ? `${selectedItem.rating} / 5` : "N/A"}
            </div>
            <p className="text-yellow-200/90 text-base mb-6 flex items-start">
              <MapPin size={20} className="text-yellow-400/80 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                {selectedItem.area}, {selectedItem.city} – {selectedItem.pincode}
              </span>
            </p>
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow-[0_0_10px_rgba(250,204,21,0.4)] hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
              onClick={closeModal}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default All;