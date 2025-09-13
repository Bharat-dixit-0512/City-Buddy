import express from "express";
import { getAttraction } from "../controller/attraction.controller.js";

const attractionRouter = express.Router();

attractionRouter.get("/", getAttraction);

export default attractionRouter;
