import Attraction from "../model/attraction.model.js";
import mongoose from "mongoose";
import { readCollection } from "../services/data.service.js";
import { appendToCollection } from "../services/data.service.js";

export const getAttraction = async (req, res) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const attractions = await Attraction.find();
      return res.status(200).json(attractions);
    }

    const attractions = await readCollection("attractions");
    res.status(200).json(attractions || []);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const createAttraction = async (req, res) => {
  try {
    const payload = req.body;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const created = await Attraction.create(payload);
      return res.status(201).json(created);
    }

    // fallback to file
    // ensure simple id
    const item = { id: Date.now(), ...payload };
    await appendToCollection("attractions", item);
    res.status(201).json({ message: "Created (fallback)", item });
  } catch (error) {
    console.error("Error creating attraction:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
