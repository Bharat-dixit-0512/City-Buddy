export const PLACE_CARD_FIELDS = [
  "_id",
  "name",
  "city",
  "area",
  "description",
  "image",
  "category",
  "rating",
  "reviewCount",
  "tags",
  "priceForTwo",
  "priceCategory",
  "pricePerNight",
  "location",
  "claimedBy",
  "createdAt",
].join(" ");

export const setShortCache = (res, seconds = 60) => {
  res.set(
    "Cache-Control",
    `public, max-age=${seconds}, stale-while-revalidate=${seconds * 5}`
  );
};
