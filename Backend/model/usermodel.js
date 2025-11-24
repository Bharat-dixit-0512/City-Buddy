import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin", "owner"],
      default: "user",
    },
    adminRequestStatus: {
      type: String,
      enum: ['none', 'pending', 'approved', 'denied'],
      default: 'none',
    },
    favorites: [
      {
        item: { type: Schema.Types.ObjectId, required: true, ref: 'Place' },
        _id: false
      },
    ],
    points: { type: Number, default: 0 },
    badges: [String],
  },
  { timestamps: true }
);

userSchema.index({ "favorites.item": 1 });
const User = mongoose.model("User", userSchema);
export default User;