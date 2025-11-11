import express from "express";
import {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById,
} from "../controller/restaurant.controller.js";
import { verifyToken, requireAdmin } from "../controller/auth.middleware.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/:id", getRestaurantById);
restaurantRouter.post("/", verifyToken, requireAdmin, createRestaurant);
restaurantRouter.put("/:id", verifyToken, requireAdmin, updateRestaurant);
restaurantRouter.delete("/:id", verifyToken, requireAdmin, deleteRestaurant);

export default restaurantRouter;