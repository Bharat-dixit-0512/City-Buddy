const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const FALLBACK_PLACE_IMAGE = "/citybuddylogo.png";

export const formatIndianCurrency = (value) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "";
  }

  return currencyFormatter.format(value);
};

export const getPlaceCoordinates = (place) => {
  const locationCoordinates = place?.location?.coordinates;

  if (Array.isArray(locationCoordinates) && locationCoordinates.length >= 2) {
    return {
      latitude: Number(locationCoordinates[1]),
      longitude: Number(locationCoordinates[0]),
    };
  }

  if (place?.latitude != null && place?.longitude != null) {
    return {
      latitude: Number(place.latitude),
      longitude: Number(place.longitude),
    };
  }

  return null;
};
