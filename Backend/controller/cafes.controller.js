import Cafes from "../model/cafes.model.js";

export const getCafes = async (req, res) => {
  try {
    const cafes = await Cafes.find();
    res.status(200).json(cafes);
  } catch (error) {
    console.error("Error fetching cafes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
