import Place from "../model/place.model.js";
import { PLACE_CARD_FIELDS, setShortCache } from "../constants/placeFields.js";

export const getHomePageData = async (req, res) => {
  try {
    setShortCache(res, 60);

    const [topRatedPlaces, newlyAddedPlaces] = await Promise.all([
      Place.find({ rating: { $gte: 4 } })
        .select(PLACE_CARD_FIELDS)
        .sort({ rating: -1 })
        .limit(4)
        .lean(),
      Place.find({})
        .select(PLACE_CARD_FIELDS)
        .sort({ createdAt: -1 })
        .limit(4)
        .lean(),
    ]);

    res.status(200).json({ topRatedPlaces, newlyAddedPlaces });
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching homepage data.",
      error: error.message,
    });
  }
};
