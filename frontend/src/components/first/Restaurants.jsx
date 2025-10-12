import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Cards from "../cards/Cards";

function Restaurants() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";
        const res = await axios.get(`${API_BASE}/restaurants`); // ✅ Corrected endpoint
        setRestaurants(res.data); 
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    getRestaurants();
  }, []);

  const handleCardClick = (item) => {
    setSelectedRestaurant(item);
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
  };

  const uniqueCities = [...new Set(restaurants.map((item) => item.city))];

  const filteredRestaurants = cityFilter
    ? restaurants.filter((item) => item.city === cityFilter)
    : restaurants;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-indigo-700 mb-4 hover:scale-105 duration-200 cursor-pointer">
          Restaurants & Hotels
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Discover top-rated restaurants and hotels across India. Whether you're planning a weekend getaway or a long vacation, find the perfect stay with comfort, style, and convenience.
        </p>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((item) => (
            <div key={item.id} onClick={() => handleCardClick(item)}>
              <Cards item={item} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No restaurants or hotels found for this city.
          </p>
        )}
      </div>

      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
            <img
              src={selectedRestaurant.image || "https://via.placeholder.com/400"}
              alt={selectedRestaurant.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedRestaurant.name}</h2>
            <p className="text-gray-600 mb-2">{selectedRestaurant.description}</p>
            <p className="text-indigo-600 font-semibold mb-1">
              ⭐ {selectedRestaurant.rating} / 5
            </p>
            <p className="text-gray-700 mb-4">
              📍 {selectedRestaurant.area}, {selectedRestaurant.city} - {selectedRestaurant.pincode}
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

export default Restaurants;