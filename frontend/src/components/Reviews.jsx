import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { userAuth } from '../context/AuthProvider';
import Spinner from './shared/Spinner';
import { Star } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const Reviews = ({ itemType, itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { authUser } = userAuth();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/reviews/${itemType}/${itemId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !comment) {
      toast.error("Please provide a rating and a comment.");
      return;
    }
    try {
      const payload = { item: itemId, itemType, rating, comment };
      await axios.post(`${API_BASE}/reviews`, payload);
      toast.success("Review submitted!");
      setRating(0);
      setComment('');
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-3">Reviews</h3>
      {authUser && (
        <form onSubmit={handleSubmit} className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={24} className={`cursor-pointer ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} onClick={() => setRating(index + 1)} />
            ))}
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." rows={3} className="w-full p-2 border rounded-md" />
          <button type="submit" className="mt-2 px-4 py-2 bg-[#FF7B54] text-white rounded-lg text-sm">Submit Review</button>
        </form>
      )}
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {loading ? <Spinner /> : reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review._id} className="text-sm border-b pb-2">
              <div className="flex justify-between items-center">
                <strong className="text-gray-800">{review.user.username}</strong>
                <div className="flex items-center text-yellow-500">
                   {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-gray-600 mt-1">{review.comment}</p>
            </div>
          ))
        ) : <p className="text-sm text-gray-500">No reviews yet.</p>}
      </div>
    </div>
  );
};

export default Reviews;