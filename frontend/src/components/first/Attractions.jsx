import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards";

function Attractions() {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4001";
    const getAttraction = async () => {
      try {
        const res = await axios.get(`${API}/attractions`); // ✅ match backend route
        setAttractions(res.data); // ✅ correct setter
      } catch (error) {
        console.error("Error fetching attractions:", error);
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

  const uniqueCities = [...new Set(attractions.map((item) => item.city))];

  const filteredAttractions = cityFilter
    ? attractions.filter((item) => item.city === cityFilter)
    : attractions;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-indigo-700 mb-4 hover:scale-105 duration-200 cursor-pointer">
          Attractions
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Discover top attractions across India. From historic landmarks to scenic spots, find places worth exploring and experiencing.
        </p>
      </div>

      {/* City filter dropdown */}
      <div className="flex justify-center mb-8">
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border border-gray-500 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Attraction cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        {filteredAttractions.length > 0 ? (
          filteredAttractions.map((item) => (
            <div key={item.id} onClick={() => handleCardClick(item)}>
              <Cards item={item} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No attractions found for this city.
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
            <img
              src={selectedAttraction.image || "https://via.placeholder.com/400"}
              alt={selectedAttraction.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedAttraction.name}</h2>
            <p className="text-gray-600 mb-2">{selectedAttraction.description}</p>
            <p className="text-indigo-600 font-semibold mb-1">
              ⭐ {selectedAttraction.rating} / 5
            </p>
            <p className="text-gray-700 mb-4">
              📍 {selectedAttraction.area}, {selectedAttraction.city} –{" "}
              {selectedAttraction.pincode}
            </p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 cursor-pointer rounded-xl"
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
