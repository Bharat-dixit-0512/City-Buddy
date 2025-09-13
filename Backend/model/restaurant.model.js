import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  city: String,
  area: String,
  pincode: String,
  description: String,
  image: String,
  rating: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
