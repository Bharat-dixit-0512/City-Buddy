import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cafeRouter from "./Route/cafes.routes.js";
import attractionRouter from "./Route/attraction.route.js";
import restaurantRouter from "./Route/restaurants.route.js"; // Corrected import path
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
app.use("/restaurants", restaurantRouter); // Corrected route from /hotels
app.use("/user", userRouter); // ✅ user routes

// Health check endpoint to verify server and DB connectivity
app.get("/health", async (req, res) => {
  try {
    const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    let pingResult = null;
    if (state === 1 && mongoose.connection.db) {
      // run a ping command against the admin database
      try {
        pingResult = await mongoose.connection.db.admin().ping();
      } catch (err) {
        pingResult = { error: err.message };
      }
    }

    res.json({ ok: true, server: true, mongoState: state, ping: pingResult });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Global error handler (captures errors thrown in routes)
app.use((err, req, res, next) => {
  console.error("Unhandled route error:", err && err.stack ? err.stack : err);
  res.status(500).json({ message: "Internal Server Error", error: err?.message || String(err) });
});

// Process-level error logging
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err && err.stack ? err.stack : err);
  // Optionally exit process in production: process.exit(1)
});

// Connect to MongoDB
if (URI) {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection Successful with MongoDB 😁"))
    .catch((error) => console.error("❌ MongoDB Connection Error:", error));
} else {
  console.log("⚠️  MongoDB URI not found, running in file-based mode");
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} 🦋`);
});