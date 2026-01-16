import express from "express";
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
  getPlaceById,
  suggestEdit
} from "../controller/place.controller.js";
import { verifyToken, requireAdmin } from "../controller/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getPlaces);
router.get("/:id", getPlaceById);
router.post("/", verifyToken, requireAdmin, upload.single('image'), createPlace);
router.put("/:id", verifyToken, requireAdmin, upload.single('image'), updatePlace);
router.delete("/:id", verifyToken, requireAdmin, deletePlace);
router.post("/:placeId/suggest-edit", verifyToken, suggestEdit);

export default router;