import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { userAuth } from '../context/AuthProvider';
import Spinner from './shared/Spinner';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const Reviews = ({ itemId, placeOwnerId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [replyingTo, setReplyingTo] = useState(null);
  const { authUser, isOwner, refreshUser } = userAuth();
  const { register, handleSubmit, reset } = useForm();

  const fetchReviews = async () => {
    if (!itemId) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/reviews/${itemId}?sort=${sort}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [itemId, sort]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) {
      return toast.error("Please provide a rating and a comment.");
    }
    try {
      await axios.post(`${API_BASE}/reviews`, { item: itemId, rating, comment });
      toast.success("Review submitted! Points awarded.");
      setRating(0);
      setComment('');
      fetchReviews();
      if (refreshUser) refreshUser();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review.");
    }
  };
  
  const handleVote = async (reviewId) => {
      if (!authUser) return toast.error("You must be logged in to vote.");
      setReviews(prevReviews => prevReviews.map(r => {
          if (r._id === reviewId) {
              const alreadyVoted = r.helpfulVotes.includes(authUser._id);
              if (alreadyVoted) {
                  return { ...r, helpfulVotes: r.helpfulVotes.filter(id => id !== authUser._id) };
              } else {
                  return { ...r, helpfulVotes: [...r.helpfulVotes, authUser._id] };
              }
          }
          return r;
      }));
      try {
          await axios.post(`${API_BASE}/reviews/${reviewId}/vote`);
          if (refreshUser) refreshUser();
      } catch (error) {
          toast.error("Failed to sync vote.");
          fetchReviews();
      }
  };
  
  const handleReplySubmit = async (data) => {
      try {
          const res = await axios.post(`${API_BASE}/reviews/${replyingTo}/reply`, { comment: data.replyComment });
          setReviews(prevReviews => prevReviews.map(r => r._id === replyingTo ? res.data : r));
          toast.success("Reply posted!");
          setReplyingTo(null);
          reset();
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to post reply.");
      }
  };

  const hasUserReviewed = reviews.some(review => review.user?._id === authUser?._id);

  return (
    <div>
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold">Reviews</h3>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm border rounded-md p-1 bg-white">
                <option value="-createdAt">Most Recent</option>
                <option value="helpful">Most Helpful</option>
            </select>
        </div>
        
        {authUser && authUser.role === 'user' && !hasUserReviewed && (
            <form onSubmit={handleReviewSubmit} className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2 cursor-pointer">
                    {[...Array(5)].map((_, index) => (
                        <Star 
                            key={index} 
                            size={24} 
                            className={index < rating ? 'text-yellow-400' : 'text-gray-300'} 
                            onClick={() => setRating(index + 1)} 
                        />
                    ))}
                </div>
                <textarea 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Share your experience..." 
                    rows={3} 
                    className="w-full p-2 border rounded-md" 
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-[#FF7B54] text-white rounded-lg text-sm">
                    Submit Review
                </button>
            </form>
        )}

        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {loading ? <Spinner /> : reviews.length > 0 ? (
            reviews.map(review => (
                <div key={review._id} className="text-sm border-b pb-3">
                    <div className="flex justify-between items-center">
                        <strong className="text-gray-800">{review.user?.username || 'A Deleted User'}</strong>
                        <div className="flex items-center text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                    </div>
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                    <div className="flex items-center gap-4 mt-2">
                        <button onClick={() => handleVote(review._id)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600">
                            <ThumbsUp size={14} className={review.helpfulVotes.includes(authUser?._id) ? 'text-blue-600' : ''}/> {review.helpfulVotes.length} Helpful
                        </button>
                        {(isOwner && authUser._id === placeOwnerId) && !review.reply && (
                            <button onClick={() => setReplyingTo(review._id)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600">
                                <MessageSquare size={14} /> Reply
                            </button>
                        )}
                    </div>
                    {replyingTo === review._id && (
                        <form onSubmit={handleSubmit(handleReplySubmit)} className="mt-2 pl-4">
                            <textarea {...register("replyComment", { required: true })} rows={2} className="w-full p-1 border rounded-md" placeholder="Write your reply..."></textarea>
                            <button type="submit" className="text-xs px-2 py-1 bg-green-500 text-white rounded-md mt-1">Post Reply</button>
                        </form>
                    )}
                    {review.reply && (
                        <div className="mt-2 ml-4 pl-3 border-l-2 bg-gray-50 p-2 rounded-r-lg">
                            <p className="font-semibold text-xs text-gray-800">Reply from {review.reply.user?.username || 'Owner'}</p>
                            <p className="text-xs text-gray-600">{review.reply.comment}</p>
                        </div>
                    )}
                </div>
            ))
            ) : <p className="text-sm text-gray-500">No reviews yet.</p>}
        </div>
    </div>
  );
};

export default Reviews;