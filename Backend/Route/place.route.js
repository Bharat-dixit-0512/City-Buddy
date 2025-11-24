import express from "express";
import {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
  getPlaceById,
  suggestEdit,
} from "../controller/place.controller.js";
import { verifyToken, requireAdmin } from "../controller/auth.middleware.js";

const router = express.Router();

router.get("/", getPlaces);
router.get("/:id", getPlaceById);
router.post("/", verifyToken, requireAdmin, createPlace);
router.put("/:id", verifyToken, requireAdmin, updatePlace);
router.delete("/:id", verifyToken, requireAdmin, deletePlace);
router.post("/:placeId/suggest-edit", verifyToken, suggestEdit);

export default router;
