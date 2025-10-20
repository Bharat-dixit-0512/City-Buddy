import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards"; 
import { X, Star, MapPin } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

function Attractions() {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAttraction = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/attractions`);
        setAttractions(res.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching attractions:", error);
        setError("Failed to load attractions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getAttraction();
  }, []);

  const handleCardClick = (item) => {
    setSelectedAttraction(item);
  };

  const closeModal = () => {
    setSelectedAttraction(null);
  };

  const uniqueCities = [...new Set(attractions.map((item) => item.city))].sort();

  const filteredAttractions = cityFilter
    ? attractions.filter((item) => item.city === cityFilter)
    : attractions;

  return (
    <div className="min-h-screen bg-black text-yellow-200/90 px-4 md:px-10 py-12">
      <div className="text-center mb-10 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400 mb-4 [text-shadow:_0_0_10px_theme(colors.yellow.500)]">
          Attractions
        </h1>
        <p className="text-yellow-200/80 text-base md:text-lg max-w-2xl mx-auto">
          Discover top attractions across India. From historic landmarks to scenic spots, find places worth exploring and experiencing.
        </p>
      </div>

      {/* City filter dropdown */}
      <div className="flex justify-center mb-8">
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="bg-gray-800 border border-yellow-500/40 text-yellow-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Loading, Error, and Content Display */}
      {loading ? (
        <div className="text-center text-yellow-400 animate-pulse">Loading attractions...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {filteredAttractions.length > 0 ? (
            filteredAttractions.map((item, idx) => (
              <div key={item._id || idx} onClick={() => handleCardClick(item)} className="cursor-pointer">
                <Cards item={item} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-yellow-200/70 py-10">
              No attractions found for this city.
            </p>
          )}
        </div>
      )}

      {/* Themed Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-gray-900 rounded-3xl shadow-2xl shadow-yellow-500/20 border border-yellow-500/30 max-w-lg w-full relative p-6 md:p-8">
             <button className="absolute top-4 right-4 text-yellow-400/80 hover:text-yellow-300" onClick={closeModal}>
              <X size={24} />
            </button>
            <img
              src={selectedAttraction.image || "https://via.placeholder.com/600x400"}
              alt={selectedAttraction.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-yellow-300 mb-2">{selectedAttraction.name}</h2>
            <p className="text-yellow-200/90 text-sm mb-3 leading-relaxed">{selectedAttraction.description}</p>
            <div className="flex items-center text-lg font-bold text-yellow-400 mb-2">
              <Star size={18} className="text-yellow-500 mr-2" fill="currentColor" />
              {selectedAttraction.rating ? `${selectedAttraction.rating} / 5` : "N/A"}
            </div>
            <p className="text-yellow-200/90 text-sm mb-6 flex items-start">
               <MapPin size={18} className="text-yellow-400/80 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                {selectedAttraction.area}, {selectedAttraction.city} – {selectedAttraction.pincode}
              </span>
            </p>
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow-[0_0_10px_rgba(250,204,21,0.4)] hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attractions;