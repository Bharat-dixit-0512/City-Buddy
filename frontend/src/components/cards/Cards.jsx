import React from "react";

const Cards = ({ item }) => {
  return (
    <div className="mt-10 mx-auto max-w-sm bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-102 cursor-pointer border border-gray-100">
      <a href="#" className="block">
        <img
          className="w-full h-52 object-cover rounded-t-3xl" // Increased height and rounded top
          src={item.image || "https://via.placeholder.com/400x200?text=No+Image"} // Placeholder for missing images
          alt={`${item.name} Image`}
        />
      </a>

      <div className="p-6 space-y-4"> {/* Increased padding and spacing */}
        <a href="#" className="block">
          <h2 className="text-2xl font-extrabold text-indigo-800 hover:text-indigo-600 transition duration-200">
            {item.name}
          </h2>
        </a>

        <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {item.city}
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 13a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            {item.pincode}
          </span>
        </div>

        <p className="text-gray-700 text-base leading-relaxed line-clamp-3"> {/* Added line-clamp for description */}
          {item.description}
        </p>

        <p className="text-base font-semibold text-gray-800 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 13a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          Area: <span className="text-indigo-600 font-bold">{item.area}</span>
        </p>
      </div>
    </div>
  );
};

export default Cards;