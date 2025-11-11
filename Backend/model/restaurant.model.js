import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  pincode: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;