import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import { X, Star, MapPin } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

function Cafes() {
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCafes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/cafes`);
        setCafes(res.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching cafes:", error);
        setError("Failed to load cafes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getCafes();
  }, []);

  const handleCardClick = (item) => setSelectedCafe(item);
  const closeModal = () => setSelectedCafe(null);

  const uniqueCities = [...new Set(cafes.map((item) => item.city))].sort();

  const filteredCafes = cityFilter
    ? cafes.filter((item) => item.city === cityFilter)
    : cafes;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#495057] px-4 md:px-10 py-12">
      {/* Header */}
      <div className="text-center mb-10 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#212529] mb-4">
          Cafes
        </h1>
        <p className="text-[#495057] text-base md:text-lg max-w-2xl mx-auto">
          Explore the best cafes across India. Whether you’re catching up with
          friends or looking for a cozy corner, find the perfect café experience.
        </p>
      </div>

      {/* Dropdown filter */}
      <div className="flex justify-center mb-8">
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="bg-white border border-[#E9ECEF] text-[#212529] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
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
        <div className="text-center text-[#0077B6] animate-pulse">Loading cafes...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {filteredCafes.length > 0 ? (
            filteredCafes.map((item, idx) => (
              <div
                key={item._id || idx}
                onClick={() => handleCardClick(item)}
                className="cursor-pointer"
              >
                <Cards item={item} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-[#495057] py-10">
              No cafes found for this city.
            </p>
          )}
        </div>
      )}

      {/* Themed Modal */}
      {selectedCafe && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#E9ECEF] max-w-lg w-full relative p-6 md:p-8">
            <button
              className="absolute top-4 right-4 text-[#495057] hover:text-[#212529]"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <img
              src={selectedCafe.image || "https://via.placeholder.com/600x400"}
              alt={selectedCafe.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-[#212529] mb-2">
              {selectedCafe.name}
            </h2>
            <p className="text-[#495057] text-sm mb-3 leading-relaxed">
              {selectedCafe.description}
            </p>
            <div className="flex items-center text-lg font-bold text-[#212529] mb-2">
              <Star size={18} className="text-[#FFD60A] mr-2" fill="currentColor" />
              {selectedCafe.rating ? `${selectedCafe.rating} / 5` : "N/A"}
            </div>
            <p className="text-[#495057] text-sm mb-6 flex items-start">
              <MapPin
                size={18}
                className="text-[#0077B6] mr-2 flex-shrink-0 mt-0.5"
              />
              <span>
                {selectedCafe.area}, {selectedCafe.city} – {selectedCafe.pincode}
              </span>
            </p>
            <button
              className="w-full bg-[#FF7B54] hover:bg-[#E85D04] text-white font-semibold px-6 py-3 rounded-xl shadow-[0_0_10px_rgba(255,123,84,0.4)] hover:shadow-[0_0_15px_rgba(232,93,4,0.6)] transition-all duration-300"
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