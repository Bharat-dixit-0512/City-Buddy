import Review from "../model/review.model.js";
import Place from "../model/place.model.js"; // IMPORT THIS
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  const { item, rating, comment } = req.body;
  const userId = req.user.id;

  if (!item || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const existingReview = await Review.findOne({ user: userId, item }).session(session);
    if (existingReview) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: "You have already reviewed this item." });
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
        // The itemType is now stored with the review for easier querying if needed
        itemType: place.category 
    });
    await newReview.save({ session });

    const reviews = await Review.find({ item }).session(session);
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const newAverageRating = totalRating / reviews.length;

    await Place.findByIdAndUpdate(item, {
      rating: newAverageRating.toFixed(2),
      reviewCount: reviews.length,
    }, { session });

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

  try {
    const reviews = await Review.find({ item: itemId }).populate("user", "username");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};