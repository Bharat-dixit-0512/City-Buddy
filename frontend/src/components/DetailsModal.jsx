import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { X, Star, MapPin, Heart, Wallet, BedDouble, Phone, Globe, Navigation, Edit, Building } from 'lucide-react';
import Reviews from './Reviews';
import { userAuth } from '../context/AuthProvider';
import { useForm } from 'react-hook-form';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const DetailsModal = ({ item, onClose }) => {
  const { authUser, isFavorite, toggleFavorite } = userAuth();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const { register, handleSubmit, reset: resetEdit } = useForm();
  const { register: registerClaim, handleSubmit: handleSubmitClaim, reset: resetClaim } = useForm();

  if (!item) return null;
  
  const hasCoordinates = item.location?.coordinates?.length >= 2;
  const getDirectionsUrl = hasCoordinates ? `https://www.google.com/maps?q=${item.location.coordinates[1]},${item.location.coordinates[0]}` : null;

  const onEditSubmit = async (data) => {
    try {
        await axios.post(`${API_BASE}/places/${item._id}/suggest-edit`, { suggestion: data.suggestion });
        toast.success("Thank you! Your suggestion has been submitted for review.");
        setShowEditForm(false);
        resetEdit();
    } catch (error) {
        toast.error("Failed to submit suggestion.");
    }
  };

  const onClaimSubmit = async (data) => {
    try {
        await axios.post(`${API_BASE}/admin/claims`, { placeId: item._id, message: data.message });
        toast.success("Your claim request has been submitted for review.");
        setShowClaimForm(false);
        resetClaim();
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to submit claim.");
    }
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative max-h-[90vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black z-20 bg-white/70 rounded-full p-1" onClick={onClose}><X size={24} /></button>
        <div className="relative h-64 lg:h-full">
          <img src={item.image || "https://via.placeholder.com/600x800"} alt={item.name} className="absolute w-full h-full object-cover" />
          {authUser && (<button onClick={() => toggleFavorite(item._id)} className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10"><Heart size={20} className={isFavorite(item._id) ? "text-red-500 fill-current" : "text-gray-600"} /></button>)}
        </div>
        <div className="p-6 md:p-8 flex flex-col h-full max-h-[90vh] lg:max-h-full">
          <div className="flex-shrink-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1.5 font-bold text-yellow-500"><Star size={16} fill="currentColor" /><span>{item.rating?.toFixed(1) || 'New'} ({item.reviewCount || 0} reviews)</span></div>
              <div className="flex items-center gap-1.5"><MapPin size={16} /><span>{item.city}</span></div>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto pr-2 -mr-2 my-4">
            {item.priceForTwo && (<div className="flex items-center gap-2 text-lg text-gray-800 font-medium mb-4"><Wallet size={20} className="text-green-600" /><span>₹{item.priceForTwo.toLocaleString('en-IN')} for two people</span></div>)}
            {item.pricePerNight && (<div className="flex items-center gap-2 text-lg text-gray-800 font-medium mb-4"><BedDouble size={20} className="text-blue-600" /><span>₹{item.pricePerNight.toLocaleString('en-IN')} / night</span></div>)}
            <p className="text-gray-700 text-base mb-4 leading-relaxed">{item.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.priceCategory && (<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">{item.priceCategory}</span>)}
              {item.tags?.map(tag => (<span key={tag} className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full">{tag}</span>))}
            </div>
            <div className="space-y-2 my-4">
              {item.phone && (<a href={`tel:${item.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600"><Phone size={16} /><span>{item.phone}</span></a>)}
              {item.website && (<a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600"><Globe size={16} /><span>Visit Website</span></a>)}
              {getDirectionsUrl && (<a href={getDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600"><Navigation size={16} /><span>Get Directions</span></a>)}
              {authUser && <button onClick={() => { setShowEditForm(!showEditForm); setShowClaimForm(false); }} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600"><Edit size={14} /><span>Suggest an Edit</span></button>}
              {authUser && !item.claimedBy && <button onClick={() => { setShowClaimForm(!showClaimForm); setShowEditForm(false); }} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600"><Building size={14} /><span>Claim this Business</span></button>}
            </div>
            {showEditForm && (
              <form onSubmit={handleSubmit(onEditSubmit)} className="my-4 p-3 bg-gray-50 rounded-lg space-y-2">
                  <textarea {...register("suggestion", { required: true })} placeholder="What needs to be corrected?" rows={2} className="w-full p-2 border rounded-md"></textarea>
                  <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">Submit Suggestion</button>
              </form>
            )}
            {showClaimForm && (
              <form onSubmit={handleSubmitClaim(onClaimSubmit)} className="my-4 p-3 bg-gray-50 rounded-lg space-y-2">
                  <textarea {...registerClaim("message")} placeholder="Add a message for the admins (optional)" rows={2} className="w-full p-2 border rounded-md"></textarea>
                  <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">Submit Claim Request</button>
              </form>
            )}
          </div>
          
          <div className="flex-shrink-0 border-t pt-4">
            <Reviews itemType={item.category} itemId={item._id} placeOwnerId={item.claimedBy} />
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default DetailsModal;