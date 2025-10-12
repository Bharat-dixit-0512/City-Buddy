import Cafes from "../model/cafes.model.js";
import mongoose from "mongoose";
import { readCollection } from "../services/data.service.js";
import { appendToCollection } from "../services/data.service.js";

export const getCafes = async (req, res) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const cafes = await Cafes.find();
      return res.status(200).json(cafes);
    }

    const cafes = await readCollection("cafes");
    res.status(200).json(cafes || []);
  } catch (error) {
    console.error("Error fetching cafes:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const createCafe = async (req, res) => {
  try {
    const payload = req.body;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const created = await Cafes.create(payload);
      return res.status(201).json(created);
    }

    const item = { id: Date.now(), ...payload };
    await appendToCollection("cafes", item);
    res.status(201).json({ message: "Created (fallback)", item });
  } catch (error) {
    console.error("Error creating cafe:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
