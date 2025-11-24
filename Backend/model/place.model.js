import mongoose from "mongoose";
const { Schema } = mongoose;

const placeSchema = new Schema({
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
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
  },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
  priceForTwo: { type: Number },
  priceCategory: {
    type: String,
    enum: ['Budget', 'Mid-Range', 'Luxury'],
  },
  pricePerNight: { type: Number },
  phone: { type: String },
  website: { type: String },
  operatingHours: {
    type: Map,
    of: String,
  },
  claimedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

placeSchema.index({ location: '2dsphere' });
placeSchema.index({ name: 'text', city: 'text', description: 'text', tags: 'text' });

const Place = mongoose.model("Place", placeSchema);
export default Place;