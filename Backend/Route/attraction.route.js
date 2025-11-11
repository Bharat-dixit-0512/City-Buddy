import express from "express";
import {
  getAttractions,
  createAttraction,
  updateAttraction,
  deleteAttraction,
  getAttractionById,
} from "../controller/attraction.controller.js";
import { verifyToken, requireAdmin } from "../controller/auth.middleware.js";

const attractionRouter = express.Router();

attractionRouter.get("/", getAttractions);
attractionRouter.get("/:id", getAttractionById);
attractionRouter.post("/", verifyToken, requireAdmin, createAttraction);
attractionRouter.put("/:id", verifyToken, requireAdmin, updateAttraction);
attractionRouter.delete("/:id", verifyToken, requireAdmin, deleteAttraction);

export default attractionRouter;