import express from "express";
import { getRestaurant } from "../controller/restaurant.controller.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", getRestaurant);

export default restaurantRouter;
