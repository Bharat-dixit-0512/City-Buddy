import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cafeRouter from "./Route/cafes.routes.js";
import attractionRouter from "./Route/attraction.route.js";
import restaurantRouter from "./Route/restaurant.route.js";
import userRouter from "./Route/user.route.js"; 
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/cafes", cafeRouter);
app.use("/attractions", attractionRouter);
app.use("/hotels", restaurantRouter);
app.use("/user", userRouter); // ✅ user routes

// Connect to MongoDB
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection Successful with MongoDB 😁"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} 🦋`);
});
