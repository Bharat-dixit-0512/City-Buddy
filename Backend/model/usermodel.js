import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favorites: [
      {
        item: { type: Schema.Types.ObjectId, required: true, ref: 'Place' },
        _id: false // <-- ADD THIS LINE to prevent unnecessary sub-document IDs
      },
    ],
  },
  { timestamps: true }
);

userSchema.index({ "favorites.item": 1 });

const User = mongoose.model("User", userSchema);
export default User;