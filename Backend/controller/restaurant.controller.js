import Restaurant from "../model/restaurant.model.js";

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
