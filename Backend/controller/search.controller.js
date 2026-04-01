import Place from "../model/place.model.js";
import { PLACE_CARD_FIELDS, setShortCache } from "../constants/placeFields.js";

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const searchAll = async (req, res) => {
  const trimmedQuery = req.query.q?.trim();

  if (!trimmedQuery) {
    return res.status(400).json({ message: "Search query 'q' is required" });
  }

  try {
    setShortCache(res, 30);

    const textResults = await Place.find({ $text: { $search: trimmedQuery } })
      .select(PLACE_CARD_FIELDS)
      .limit(20)
      .lean();

    if (textResults.length > 0) {
      return res.status(200).json(textResults);
    }

    const safePattern = new RegExp(escapeRegExp(trimmedQuery), "i");
    const searchQuery = {
      $or: [
        { name: safePattern },
        { city: safePattern },
        { area: safePattern },
        { description: safePattern },
        { tags: safePattern },
        { category: safePattern },
      ],
    };

    const results = await Place.find(searchQuery)
      .select(PLACE_CARD_FIELDS)
      .sort({ rating: -1, createdAt: -1 })
      .limit(20)
      .lean();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "Server error during search",
      error: error.message,
    });
  }
};
