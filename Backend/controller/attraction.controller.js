import Attraction from "../model/attraction.model.js";

export const getAttraction = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.status(200).json(attractions);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
