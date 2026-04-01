import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAuth } from "../context/useAuth";
import Spinner from "./shared/Spinner";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "../services/api";

const Reviews = ({ itemId, placeOwnerId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [replyingTo, setReplyingTo] = useState(null);
  const { authUser, isOwner, refreshUser } = userAuth();
  const { register, handleSubmit, reset } = useForm();
  const ownerId = placeOwnerId ? String(placeOwnerId) : null;

  const fetchReviews = useCallback(async () => {
    if (!itemId) {
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/reviews/${itemId}`, { params: { sort } });
      setReviews(res.data);
    } catch {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }, [itemId, sort]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (rating === 0 || !comment.trim()) {
      return toast.error("Please provide a rating and a comment.");
    }

    try {
      await api.post(`/reviews`, { item: itemId, rating, comment });
      toast.success("Review submitted! Points awarded.");
      setRating(0);
      setComment("");
      fetchReviews();
      if (refreshUser) {
        refreshUser();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review.");
    }
  };

  const handleVote = async (reviewId) => {
    if (!authUser) {
      return toast.error("You must be logged in to vote.");
    }

    setReviews((previousReviews) =>
      previousReviews.map((review) => {
        if (review._id !== reviewId) {
          return review;
        }

        const alreadyVoted = review.helpfulVotes.some(
          (vote) => String(vote) === authUser._id
        );

        return alreadyVoted
          ? {
              ...review,
              helpfulVotes: review.helpfulVotes.filter(
                (vote) => String(vote) !== authUser._id
              ),
            }
          : {
              ...review,
              helpfulVotes: [...review.helpfulVotes, authUser._id],
            };
      })
    );

    try {
      await api.post(`/reviews/${reviewId}/vote`);
      if (refreshUser) {
        refreshUser();
      }
    } catch {
      toast.error("Failed to sync vote.");
      fetchReviews();
    }
  };

  const handleReplySubmit = async (data) => {
    try {
      const res = await api.post(`/reviews/${replyingTo}/reply`, {
        comment: data.replyComment,
      });
      setReviews((previousReviews) =>
        previousReviews.map((review) =>
          review._id === replyingTo ? res.data : review
        )
      );
      toast.success("Reply posted!");
      setReplyingTo(null);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post reply.");
    }
  };

  const hasUserReviewed = reviews.some(
    (review) => review.user?._id === authUser?._id
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-bold">Reviews</h3>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="rounded-md border bg-white p-1 text-sm"
        >
          <option value="-createdAt">Most Recent</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {authUser && authUser.role === "user" && !hasUserReviewed && (
        <form
          onSubmit={handleReviewSubmit}
          className="mb-4 rounded-lg bg-gray-50 p-3"
        >
          <div className="mb-2 flex cursor-pointer items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={24}
                className={index < rating ? "text-yellow-400" : "text-gray-300"}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share your experience..."
            rows={3}
            className="w-full rounded-md border p-2"
          />
          <button
            type="submit"
            className="mt-2 rounded-lg bg-[#FF7B54] px-4 py-2 text-sm text-white"
          >
            Submit Review
          </button>
        </form>
      )}

      <div className="max-h-60 space-y-4 overflow-y-auto pr-2">
        {loading ? (
          <Spinner />
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border-b pb-3 text-sm">
              <div className="flex items-center justify-between">
                <strong className="text-gray-800">
                  {review.user?.username || "A Deleted User"}
                </strong>
                <div className="flex items-center text-yellow-500">
                  {[...Array(review.rating)].map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-gray-600">{review.comment}</p>
              <div className="mt-2 flex items-center gap-4">
                <button
                  onClick={() => handleVote(review._id)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600"
                  type="button"
                >
                  <ThumbsUp
                    size={14}
                    className={
                      review.helpfulVotes.some(
                        (vote) => String(vote) === authUser?._id
                      )
                        ? "text-blue-600"
                        : ""
                    }
                  />{" "}
                  {review.helpfulVotes.length} Helpful
                </button>
                {isOwner && authUser._id === ownerId && !review.reply && (
                  <button
                    onClick={() => setReplyingTo(review._id)}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600"
                    type="button"
                  >
                    <MessageSquare size={14} /> Reply
                  </button>
                )}
              </div>
              {replyingTo === review._id && (
                <form
                  onSubmit={handleSubmit(handleReplySubmit)}
                  className="mt-2 pl-4"
                >
                  <textarea
                    {...register("replyComment", { required: true })}
                    rows={2}
                    className="w-full rounded-md border p-1"
                    placeholder="Write your reply..."
                  />
                  <button
                    type="submit"
                    className="mt-1 rounded-md bg-green-500 px-2 py-1 text-xs text-white"
                  >
                    Post Reply
                  </button>
                </form>
              )}
              {review.reply && (
                <div className="mt-2 ml-4 rounded-r-lg border-l-2 bg-gray-50 p-2 pl-3">
                  <p className="text-xs font-semibold text-gray-800">
                    Reply from {review.reply.user?.username || "Owner"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {review.reply.comment}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
