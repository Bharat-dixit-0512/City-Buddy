import express from "express";
import { getAttraction, createAttraction } from "../controller/attraction.controller.js";
import { verifyToken, requireAdmin } from "../controller/auth.middleware.js";

const attractionRouter = express.Router();

attractionRouter.get("/", getAttraction);
attractionRouter.post("/", verifyToken, requireAdmin, createAttraction);

export default attractionRouter;
