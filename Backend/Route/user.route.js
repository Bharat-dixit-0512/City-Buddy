import express from "express";
import {
  signup,
  login,
  toggleFavorite,
  getFavorites,
  getMe,
  updatePassword,
  requestAdminAccess,
} from "../controller/user.controller.js";
import { verifyToken } from "../controller/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.get("/favorites", verifyToken, getFavorites);
router.post("/favorites/:itemId", verifyToken, toggleFavorite);
router.put("/update-password", verifyToken, updatePassword);
router.post("/request-admin", verifyToken, requestAdminAccess);

export default router;
