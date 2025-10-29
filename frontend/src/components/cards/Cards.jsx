import React from "react";
import { MapPin, LocateFixed } from "lucide-react"; // Using icons for a cleaner look

const Cards = ({ item }) => {
  return (
    <div className="h-full bg-[#FFFFFF] rounded-3xl shadow-lg hover:shadow-xl border border-[#E9ECEF] transition-all duration-300 overflow-hidden transform hover:scale-105 cursor-pointer flex flex-col">
      {/* Image Container */}
      <div className="relative">
        <img
          className="w-full h-52 object-cover"
          src={item.image || "https://via.placeholder.com/400x220?text=No+Image"}
          alt={`${item.name} Image`}
        />
        {/* Optional: Highlight Tag using Golden Yellow */}
        {/* <div className="absolute top-3 right-3 bg-[#FFD60A] text-[#212529] text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Best Deal
        </div> */}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-2xl font-extrabold text-[#212529] hover:text-[#FF7B54] transition duration-200 truncate">
          {item.name}
        </h2>

        {/* Location Info */}
        <div className="flex justify-between items-center text-sm text-[#495057] font-medium mt-2">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#0077B6]/70" />
            {item.city}
          </span>
          <span className="flex items-center gap-1.5">
            <LocateFixed size={14} className="text-[#0077B6]/70" />
            {item.pincode}
          </span>
        </div>

        {/* Description */}
        <p className="text-[#495057] text-sm leading-relaxed line-clamp-3 my-4 flex-grow">
          {item.description}
        </p>

        {/* Area Info */}
        <div className="text-base font-semibold text-[#212529] flex items-center gap-2 mt-auto pt-3 border-t border-[#E9ECEF]">
          <MapPin size={16} className="text-[#FF7B54]" />
          Area: <span className="text-[#0077B6] font-bold">{item.area}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;