import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import placeRouter from "./Route/place.route.js"; // The new, single route for all places
import userRouter from "./Route/user.route.js";
import reviewRouter from "./Route/review.route.js";
import searchRouter from "./Route/search.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// We now only use the single "/places" route for all categories
app.use("/places", placeRouter);
app.use("/user", userRouter);
app.use("/reviews", reviewRouter);
app.use("/search", searchRouter);

// Health check endpoint to verify server and DB connectivity
app.get("/health", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    let pingResult = null;
    if (state === 1 && mongoose.connection.db) {
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

// Global error handler
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