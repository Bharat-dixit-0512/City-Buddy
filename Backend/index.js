import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import placeRouter from "./Route/place.route.js";
import userRouter from "./Route/user.route.js";
import reviewRouter from "./Route/review.route.js";
import searchRouter from "./Route/search.route.js";
import adminRouter from "./Route/admin.route.js";
import homeRouter from "./Route/home.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

app.use(cors());
app.use(express.json());

app.use("/places", placeRouter);
app.use("/user", userRouter);
app.use("/reviews", reviewRouter);
app.use("/search", searchRouter);
app.use("/admin", adminRouter);
app.use("/home", homeRouter);

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

app.use((err, req, res, next) => {
  console.error("Unhandled route error:", err && err.stack ? err.stack : err);
  res
    .status(500)
    .json({
      message: "Internal Server Error",
      error: err?.message || String(err),
    });
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err && err.stack ? err.stack : err);
});

if (URI) {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection Successful with MongoDB 😁"))
    .catch((error) => console.error("❌ MongoDB Connection Error:", error));
} else {
  console.log("⚠️  MongoDB URI not found.");
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} 🦋`);
});
