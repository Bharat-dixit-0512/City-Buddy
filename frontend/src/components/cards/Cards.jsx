import React from "react";
import { MapPin, LocateFixed } from "lucide-react"; // Using icons for a cleaner look

const Cards = ({ item }) => {
  return (
    <div className="h-full bg-gray-900/50 rounded-3xl shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 border border-yellow-500/30 transition-all duration-300 overflow-hidden transform hover:scale-105 cursor-pointer flex flex-col">
      {/* Image Container */}
      <div className="relative">
        <img
          className="w-full h-52 object-cover"
          src={item.image || "https://via.placeholder.com/400x220?text=No+Image"}
          alt={`${item.name} Image`}
        />
        {/* Optional: Add a subtle overlay for text on image in the future */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> */}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-2xl font-extrabold text-yellow-400 hover:text-yellow-300 transition duration-200 truncate">
          {item.name}
        </h2>

        {/* Location Info */}
        <div className="flex justify-between items-center text-sm text-yellow-200/70 font-medium mt-2">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-yellow-400/60" />
            {item.city}
          </span>
          <span className="flex items-center gap-1.5">
            <LocateFixed size={14} className="text-yellow-400/60" />
            {item.pincode}
          </span>
        </div>

        {/* Description */}
        <p className="text-yellow-200/90 text-sm leading-relaxed line-clamp-3 my-4 flex-grow">
          {item.description}
        </p>

        {/* Area Info */}
        <div className="text-base font-semibold text-yellow-200 flex items-center gap-2 mt-auto pt-3 border-t border-yellow-500/20">
          <MapPin size={16} className="text-yellow-400" />
          Area: <span className="text-yellow-300 font-bold">{item.area}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;