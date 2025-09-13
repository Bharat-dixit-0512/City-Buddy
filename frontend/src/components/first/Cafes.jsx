import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards";

function Cafes() {
  const [cafes, setCafes] = useState([]); 
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [cityFilter, setCityFilter] = useState("");

  // ✅ Fetch cafes from backend
  useEffect(() => {
    const getCafes = async () => {
      try {
        const res = await axios.get("http://localhost:4001/cafes"); // use same port as backend
        setCafes(res.data); // save data in state
      } catch (error) {
        console.error("Error fetching cafes:", error);
      }
    };
    getCafes();
  }, []);

  const handleCardClick = (item) => setSelectedCafe(item);
  const closeModal = () => setSelectedCafe(null);

  const uniqueCities = [...new Set(cafes.map((item) => item.city))];

  const filteredCafes = cityFilter
    ? cafes.filter((item) => item.city === cityFilter)
    : cafes;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-indigo-700 mb-4 hover:scale-105 duration-200 cursor-pointer">
          Cafes
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Explore the best cafes across India. Whether you’re catching up with
          friends or looking for a cozy corner, find the perfect café experience
          with great vibes and taste.
        </p>
      </div>

      {/* Dropdown filter */}
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

      {/* Cafes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        {filteredCafes.length > 0 ? (
          filteredCafes.map((item) => (
            <div key={item.id || item._id} onClick={() => handleCardClick(item)}>
              <Cards item={item} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No cafes found for this city.
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedCafe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
            <img
              src={selectedCafe.image || "https://via.placeholder.com/400"}
              alt={selectedCafe.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedCafe.name}</h2>
            <p className="text-gray-600 mb-2">{selectedCafe.description}</p>
            <p className="text-indigo-600 font-semibold mb-1">
              ⭐ {selectedCafe.rating} / 5
            </p>
            <p className="text-gray-700 mb-4">
              📍 {selectedCafe.area}, {selectedCafe.city} – {selectedCafe.pincode}
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

export default Cafes;
