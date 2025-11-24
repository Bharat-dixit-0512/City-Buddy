import Review from "../model/review.model.js";
import Place from "../model/place.model.js";
import User from "../model/usermodel.js";
import mongoose from "mongoose";

const awardBadge = async (user, badgeName) => {
  if (!user.badges.includes(badgeName)) {
    user.badges.push(badgeName);
    user.points += 50;
  }
};

export const createReview = async (req, res) => {
  const { item, rating, comment } = req.body;
  const userId = req.user.id;
  if (!item || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const existingReview = await Review.findOne({ user: userId, item }).session(
      session
    );
    if (existingReview) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(409)
        .json({ message: "You have already reviewed this item." });
    }
    const place = await Place.findById(item).session(session);
    if (!place) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Place not found." });
    }
    const newReview = new Review({
      user: userId,
      item,
      rating,
      comment,
      itemType: place.category,
    });
    await newReview.save({ session });
    const reviews = await Review.find({ item }).session(session);
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const newAverageRating = totalRating / reviews.length;
    await Place.findByIdAndUpdate(
      item,
      { rating: newAverageRating.toFixed(2), reviewCount: reviews.length },
      { session }
    );
    const user = await User.findById(userId).session(session);
    user.points += 10;
    const userReviewsCount = await Review.countDocuments({
      user: userId,
    }).session(session);
    if (userReviewsCount === 1) await awardBadge(user, "First Review");
    if (userReviewsCount >= 10) await awardBadge(user, "Top Contributor");
    await user.save({ session });
    await session.commitTransaction();
    session.endSession();
    const populatedReview = await newReview.populate("user", "username");
    res.status(201).json(populatedReview);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsForItem = async (req, res) => {
  const { itemId } = req.params;
  const { sort = "-createdAt" } = req.query;
  let sortOption = {};
  if (sort === "helpful") {
    sortOption = { helpfulVotesCount: -1 };
  } else {
    sortOption = { createdAt: -1 };
  }
  try {
    const reviews = await Review.aggregate([
      { $match: { item: new mongoose.Types.ObjectId(itemId) } },
      { $addFields: { helpfulVotesCount: { $size: "$helpfulVotes" } } },
      { $sort: sortOption },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $project: { "user.password": 0, "user.email": 0 } },
    ]);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleHelpfulVote = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;
  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });
    const voteIndex = review.helpfulVotes.indexOf(userId);
    const user = await User.findById(review.user);
    if (voteIndex > -1) {
      review.helpfulVotes.splice(voteIndex, 1);
      if (user) user.points -= 2;
    } else {
      review.helpfulVotes.push(userId);
      if (user) user.points += 2;
    }
    await review.save();
    if (user) {
      if (review.helpfulVotes.length >= 10)
        await awardBadge(user, "Tastemaker");
      await user.save();
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replyToReview = async (req, res) => {
  const { reviewId } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;
  try {
    const review = await Review.findById(reviewId).populate("item");
    if (!review) return res.status(404).json({ message: "Review not found." });
    if (review.item.claimedBy?.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Only the owner of this place can reply." });
    }
    review.reply = { user: userId, comment };
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
