import Place from "../model/place.model.js";
import EditSuggestion from "../model/editSuggestion.model.js";

const parseQuery = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 12;
  const skip = (page - 1) * limit;
  let sort = {};
  
  switch (query.sort) {
      case 'priceForTwo': sort = { priceForTwo: 1 }; break;
      case '-priceForTwo': sort = { priceForTwo: -1 }; break;
      case 'pricePerNight': sort = { pricePerNight: 1 }; break;
      case '-pricePerNight': sort = { pricePerNight: -1 }; break;
      default: sort = { rating: -1 };
  }

  const filters = {};
  if (query.category) filters.category = query.category;
  if (query.city) filters.city = query.city;
  if (query.tags) filters.tags = { $in: query.tags.split(',') };
  return { filters, page, limit, skip, sort };
};

export const getPlaces = async (req, res) => {
  try {
    const { filters, page, limit, skip, sort } = parseQuery(req.query);
    const places = await Place.find(filters).sort(sort).skip(skip).limit(limit);
    const total = await Place.countDocuments(filters);
    res.status(200).json({ data: places, page, pages: Math.ceil(total / limit), total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlace = async (req, res) => {
  try {
    const payload = req.body;
    if (req.file) {
      payload.image = req.file.path;
    }
    if (payload.latitude && payload.longitude) {
        payload.location = { type: 'Point', coordinates: [parseFloat(payload.longitude), parseFloat(payload.latitude)] };
    }
    if (payload.tags && typeof payload.tags === 'string') {
        payload.tags = payload.tags.split(',').map(tag => tag.trim());
    }
    const created = await Place.create(payload);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const payload = req.body;
    if (req.file) {
      payload.image = req.file.path;
    }
    if (payload.latitude && payload.longitude) {
        payload.location = { type: 'Point', coordinates: [parseFloat(payload.longitude), parseFloat(payload.latitude)] };
    }
    if (payload.tags && typeof payload.tags === 'string') {
        payload.tags = payload.tags.split(',').map(tag => tag.trim());
    }
    const updated = await Place.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: "Place not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const deleted = await Place.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Place not found" });
    res.status(200).json({ message: "Place deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const suggestEdit = async (req, res) => {
    const userId = req.user.id;
    const { placeId } = req.params;
    const { suggestion } = req.body;
    try {
        const newSuggestion = new EditSuggestion({ user: userId, place: placeId, suggestion });
        await newSuggestion.save();
        res.status(201).json({ message: "Suggestion submitted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};