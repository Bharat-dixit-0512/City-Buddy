import mongoose from "mongoose";

const cafesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  city: String,
  area: String,
  pincode: String,
  description: String,
  image: String,
  rating: Number,
});

const Cafes = mongoose.model("Cafes", cafesSchema);

export default Cafes;
