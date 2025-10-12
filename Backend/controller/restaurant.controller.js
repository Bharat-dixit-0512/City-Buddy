import Restaurant from "../model/restaurant.model.js";
import mongoose from "mongoose";
import { readCollection } from "../services/data.service.js";
import { appendToCollection } from "../services/data.service.js";

export const getRestaurant = async (req, res) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const restaurants = await Restaurant.find();
      return res.status(200).json(restaurants);
    }

    const restaurants = await readCollection("restaurants");
    res.status(200).json(restaurants || []);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const payload = req.body;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const created = await Restaurant.create(payload);
      return res.status(201).json(created);
    }

    const item = { id: Date.now(), ...payload };
    await appendToCollection("restaurants", item);
    res.status(201).json({ message: "Created (fallback)", item });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
