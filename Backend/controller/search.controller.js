import Place from "../model/place.model.js";

export const searchAll = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query 'q' is required" });
  }

  try {
    const searchQuery = {
      $or: [
        { name: { $regex: q, $options: "i" } },
        { city: { $regex: q, $options: "i" } },
        { area: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    };

    const results = await Place.find(searchQuery).limit(20);

    // We no longer need to separate them by category here, 
    // the frontend can do that if needed, or just display a mixed list.
    res.status(200).json(results);

  } catch (error) {
    res.status(500).json({ message: "Server error during search", error: error.message });
  }
};