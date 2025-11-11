import express from "express";
import {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
  getCafeById,
} from "../controller/cafes.controller.js";
import { verifyToken, requireAdmin } from "../controller/auth.middleware.js";

const cafeRouter = express.Router();

cafeRouter.get("/", getCafes);
cafeRouter.get("/:id", getCafeById);
cafeRouter.post("/", verifyToken, requireAdmin, createCafe);
cafeRouter.put("/:id", verifyToken, requireAdmin, updateCafe);
cafeRouter.delete("/:id", verifyToken, requireAdmin, deleteCafe);

export default cafeRouter;