import express from "express";
import {
  createReview,
  getReviewsForItem,
  toggleHelpfulVote,
  replyToReview,
} from "../controller/review.controller.js";
import { verifyToken } from "../controller/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:itemId", getReviewsForItem);
router.post("/:reviewId/vote", verifyToken, toggleHelpfulVote);
router.post("/:reviewId/reply", verifyToken, replyToReview);

export default router;
