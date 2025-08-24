import React from "react";

const Cards = ({ item }) => {
  return (
    <div className="mt-10 mx-auto max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <a href="#">
        <img
          className="w-full h-48 object-cover"
          src={item.image}
          alt={`${item.name} Image`}
        />
      </a>

      <div className="p-5 space-y-3">
        <a href="#">
          <h2 className="text-2xl font-bold text-indigo-700 hover:underline transition duration-200">
            {item.name}
          </h2>
        </a>

        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span>City: {item.city}</span>
          <span>Pincode: {item.pincode}</span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          {item.description}
        </p>

        <p className="text-sm font-semibold text-gray-800">
          Area: <span className="text-indigo-600">{item.area}</span>
        </p>
      </div>
    </div>
  );
};

export default Cards;