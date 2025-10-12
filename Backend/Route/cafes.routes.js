import express from "express";
import { getCafes, createCafe } from "../controller/cafes.controller.js";
import { verifyToken, requireAdmin } from "../controller/auth.middleware.js";

const cafeRouter = express.Router();

cafeRouter.get("/", getCafes);
cafeRouter.post("/", verifyToken, requireAdmin, createCafe);

export default cafeRouter;