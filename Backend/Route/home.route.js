import express from "express";
import { getHomePageData } from "../controller/home.controller.js";

const router = express.Router();

router.get("/", getHomePageData);

export default router;
