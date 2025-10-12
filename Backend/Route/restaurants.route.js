import express from "express";
import { getRestaurant, createRestaurant } from "../controller/restaurant.controller.js";
import { verifyToken, requireAdmin } from "../controller/auth.middleware.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", getRestaurant);
restaurantRouter.post("/", verifyToken, requireAdmin, createRestaurant);

export default restaurantRouter;