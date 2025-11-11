import express from "express";
import { createReview, getReviewsForItem } from "../controller/review.controller.js";
import { verifyToken } from "../controller/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:itemType/:itemId", getReviewsForItem);

export default router;