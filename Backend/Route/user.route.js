import express from "express";
import {
  signup,
  login,
  toggleFavorite,
  getFavorites,
  getMe,
  updatePassword,
} from "../controller/user.controller.js";
import { verifyToken } from "../controller/auth.middleware.js";

const router = express.Router();

// Route for user registration
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

// Route to get the currently logged-in user's data (requires a valid token)
router.get("/me", verifyToken, getMe);

// Route to get all favorites for the logged-in user
router.get("/favorites", verifyToken, getFavorites);

// Route to add or remove a place from the user's favorites
router.post("/favorites/:itemId", verifyToken, toggleFavorite);

// Route for a logged-in user to update their password
router.put("/update-password", verifyToken, updatePassword);

export default router;