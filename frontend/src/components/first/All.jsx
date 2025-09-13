import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards";

function All() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cafesData, setCafesData] = useState([]);
  const [attractionsData, setAttractionsData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);

  // ✅ Fetch data from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cafesRes, attractionsRes, restaurantsRes] = await Promise.all([
          axios.get("http://localhost:4001/cafes"),
          axios.get("http://localhost:4001/attractions"),
          axios.get("http://localhost:4001/hotels"),
        ]);

        setCafesData(cafesRes.data || []);
        setAttractionsData(attractionsRes.data || []);
        setRestaurantsData(restaurantsRes.data || []);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
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
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10 space-y-16">
      {/* Unified Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-indigo-700 mb-4 hover:scale-105 duration-200 cursor-pointer">
          All Cafes, Attractions & Restaurants
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          Discover the best places to eat, relax, and explore across India. Whether you're
          looking for a cozy café, a breathtaking attraction, or a luxurious restaurant or resort,
          we've curated a collection of top-rated spots to make your journey unforgettable.
        </p>
      </div>

      {/* Sections Loop */}
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-3xl font-semibold text-indigo-600 mb-6">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
            {section.data.length > 0 ? (
              section.data.map((item, idx) => (
                <div
                  key={item._id || item.id || idx}
                  onClick={() => handleCardClick(item)}
                >
                  <Cards item={item} />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No {section.title.toLowerCase()} available.
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
            <img
              src={selectedItem.image || "https://via.placeholder.com/400"}
              alt={selectedItem.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
            <p className="text-gray-600 mb-2">{selectedItem.description || "No description"}</p>
            <p className="text-indigo-600 font-semibold mb-1">
              ⭐ {selectedItem.rating || "N/A"} / 5
            </p>
            <p className="text-gray-700 mb-4">
              📍 {selectedItem.area || "Unknown"}, {selectedItem.city || "Unknown"} –{" "}
              {selectedItem.pincode || selectedItem["pin code"] || "N/A"}
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

export default All;
