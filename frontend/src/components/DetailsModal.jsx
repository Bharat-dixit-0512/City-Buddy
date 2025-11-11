import React from 'react';
import ReactDOM from 'react-dom'; // <-- 1. Import ReactDOM
import { X, Star, MapPin, Heart, Wallet, BedDouble } from 'lucide-react';
import Reviews from './Reviews';
import { userAuth } from '../context/AuthProvider';

const DetailsModal = ({ item, onClose }) => {
  const { authUser, isFavorite, toggleFavorite } = userAuth();

  if (!item) return null;

  // 2. This is the JSX for our modal. We'll pass this to the portal.
  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative max-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 bg-white/70 rounded-full p-1" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="relative h-full min-h-[300px] lg:min-h-0">
          <img src={item.image || "https://via.placeholder.com/600x800"} alt={item.name} className="absolute w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" />
          {authUser && (
             <button onClick={() => toggleFavorite(item._id, item.category)} className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10">
                <Heart size={20} className={isFavorite(item._id) ? "text-red-500 fill-current" : "text-gray-600"} />
            </button>
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1.5 font-bold text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span>{item.rating?.toFixed(1) || 'New'} ({item.reviewCount || 0} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{item.city}</span>
            </div>
          </div>

          {item.priceForTwo && (
            <div className="flex items-center gap-2 text-lg text-gray-800 font-medium mb-4">
              <Wallet size={20} className="text-green-600" />
              <span>₹{item.priceForTwo.toLocaleString('en-IN')} for two people</span>
            </div>
          )}

          {item.pricePerNight && (
            <div className="flex items-center gap-2 text-lg text-gray-800 font-medium mb-4">
                <BedDouble size={20} className="text-blue-600" />
                <span>₹{item.pricePerNight.toLocaleString('en-IN')} / night</span>
            </div>
          )}
          
          <p className="text-gray-700 text-base mb-4 leading-relaxed">{item.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
              {item.priceCategory && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">{item.priceCategory}</span>
              )}
              {item.tags?.map(tag => (
                <span key={tag} className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full">{tag}</span>
              ))}
          </div>
          <div className="mt-auto border-t pt-4">
            <Reviews itemType={item.category} itemId={item._id} />
          </div>
        </div>
      </div>
    </div>
  );

  // 3. Render the modalContent into the '#modal-root' div from index.html
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')
  );
};

export default DetailsModal;