import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema({
  id: Number,
  name: String,
  city: String,
  area: String,
  pincode: String,
  description: String,
  image: String,
  rating: Number,
});

const Attraction = mongoose.model("Attraction", attractionSchema);
export default Attraction;
