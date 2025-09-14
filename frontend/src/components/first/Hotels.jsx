import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Cards from "../cards/Cards";

function Hotels() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [hotels, setHotels] = useState([]);

  // Fetch Hotels
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4001";
    const getHotels = async () => {
      try {
        const res = await axios.get(`${API}/hotels`); // ✅ match backend route
        setHotels(res.data); 
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    getHotels();
  }, []);

  const handleCardClick = (item) => {
    setSelectedHotel(item);
  };

  const closeModal = () => {
    setSelectedHotel(null);
  };

  // Extract unique cities
  const uniqueCities = [...new Set(hotels.map((item) => item.city))];

  // Apply city filter
  const filteredHotels = cityFilter
    ? hotels.filter((item) => item.city === cityFilter)
    : hotels;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-indigo-700 mb-4 hover:scale-105 duration-200 cursor-pointer">
          Hotels
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Discover top-rated hotels across India. Whether you're planning a weekend getaway or a long vacation, find the perfect stay with comfort, style, and convenience.
        </p>
      </div>

      {/* Filter Section */}
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

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((item) => (
            <div key={item.id} onClick={() => handleCardClick(item)}>
              <Cards item={item} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No hotels found for this city.
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
            {/* Hotel Image */}
            <img
              src={selectedHotel.image || "https://via.placeholder.com/400"}
              alt={selectedHotel.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            {/* Hotel Details */}
            <h2 className="text-2xl font-bold mb-2">{selectedHotel.name}</h2>
            <p className="text-gray-600 mb-2">{selectedHotel.description}</p>
            <p className="text-indigo-600 font-semibold mb-1">
              ⭐ {selectedHotel.rating} / 5
            </p>
            <p className="text-gray-700 mb-4">
              📍 {selectedHotel.area}, {selectedHotel.city} - {selectedHotel["pin code"]}
            </p>

            {/* CTA */}
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

export default Hotels;
