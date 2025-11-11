import React from "react";
import { MapPin, Star, Heart, BedDouble } from "lucide-react";
import { userAuth } from "../../context/AuthProvider";

const Cards = ({ item, onItemClick }) => {
  const { authUser, isFavorite, toggleFavorite } = userAuth();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(item._id, item.category);
  };

  return (
    <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl border transition-all duration-300 overflow-hidden transform hover:-translate-y-1" onClick={() => onItemClick(item)}>
      <div className="relative">
        <img className="w-full h-52 object-cover" src={item.image || "https://via.placeholder.com/400x220"} alt={item.name} />
        {authUser && (
          <button onClick={handleFavoriteClick} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
            <Heart size={20} className={isFavorite(item._id) ? "text-red-500 fill-current" : "text-gray-600"} />
          </button>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-800 truncate pr-2">{item.name}</h2>
            <div className="flex items-center gap-1 text-sm font-bold bg-yellow-400 text-gray-800 px-2 py-0.5 rounded-full">
                <Star size={14} />
                <span>{item.rating?.toFixed(1) || 'New'}</span>
            </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
          <MapPin size={14} /> {item.area}, {item.city}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 my-3 flex-grow">{item.description}</p>
        
        {item.priceForTwo && (
            <div className="text-base font-semibold text-gray-900 mt-2">
                ₹{item.priceForTwo.toLocaleString('en-IN')} for two (approx.)
            </div>
        )}

        {item.pricePerNight && (
            <div className="flex items-center gap-2 text-base font-semibold text-gray-900 mt-2">
                <BedDouble size={16} />
                <span>₹{item.pricePerNight.toLocaleString('en-IN')} / night</span>
            </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t">
          {item.priceCategory && (
             <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">{item.priceCategory}</span>
          )}
          {item.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;