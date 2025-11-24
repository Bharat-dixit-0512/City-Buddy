import Place from "../model/place.model.js";

export const getHomePageData = async (req, res) => {
  try {
    const topRatedPlaces = await Place.find({ rating: { $gte: 4 } })
      .sort({ rating: -1 })
      .limit(4);

    const newlyAddedPlaces = await Place.find({})
      .sort({ createdAt: -1 })
      .limit(4);

    res.status(200).json({ topRatedPlaces, newlyAddedPlaces });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error fetching homepage data.",
        error: error.message,
      });
  }
};
