import express from "express";
import { getCafes } from "../controller/cafes.controller.js";

const cafeRouter = express.Router();

cafeRouter.get("/", getCafes);

export default cafeRouter;