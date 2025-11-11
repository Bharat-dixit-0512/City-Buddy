import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  pincode: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  category: {
    type: String,
    required: true,
    enum: ['Restaurant', 'Cafe', 'Attraction', 'Hotel', 'Guesthouse'],
  },
  
  // --- ADD THESE TWO LINES ---
  latitude: { type: Number },
  longitude: { type: Number },
  // -------------------------

  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
  
  priceForTwo: { type: Number },
  priceCategory: {
    type: String,
    enum: ['Budget', 'Mid-Range', 'Luxury'],
  },

  pricePerNight: { type: Number },
});

placeSchema.index({ name: 'text', city: 'text', description: 'text', tags: 'text' });

const Place = mongoose.model("Place", placeSchema);
export default Place;