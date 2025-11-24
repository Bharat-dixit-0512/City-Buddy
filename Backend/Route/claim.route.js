import express from "express";
import { createClaimRequest } from "../controller/claim.controller.js";
import { verifyToken } from "../controller/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createClaimRequest);

export default router;