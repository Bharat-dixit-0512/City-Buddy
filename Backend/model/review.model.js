import mongoose from "mongoose";
const { Schema } = mongoose;

const replySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    item: { type: Schema.Types.ObjectId, required: true, ref: "Place" },
    itemType: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    helpfulVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reply: { type: replySchema, default: null }
  },
  { timestamps: true }
);

reviewSchema.index({ item: 1 });
reviewSchema.index({ user: 1, item: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;