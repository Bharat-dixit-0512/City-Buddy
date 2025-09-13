import express from "express";
import { signup, login } from "../controller/user.controller.js";

const router = express.Router();

// POST /user/signup
router.post("/signup", signup);

// POST /user/login
router.post("/login", login);

export default router;
