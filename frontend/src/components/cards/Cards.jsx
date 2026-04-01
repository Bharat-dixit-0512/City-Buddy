import { MapPin, Star, Heart, BedDouble } from "lucide-react";
import { userAuth } from "../../context/useAuth";
import OptimizedImage from "../shared/OptimizedImage";
import { formatIndianCurrency } from "../../utils/placeUtils";

const Cards = ({ item, onItemClick }) => {
  const { authUser, isFavorite, toggleFavorite } = userAuth();

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    toggleFavorite(item._id);
  };

  return (
    <div
      className="h-full cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={() => onItemClick(item)}
    >
      <div className="relative">
        <OptimizedImage
          alt={item.name}
          className="h-52 w-full object-cover"
          containerClassName="h-52 w-full"
          src={item.image}
        />
        {authUser && (
          <button
            className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md"
            onClick={handleFavoriteClick}
            type="button"
          >
            <Heart
              size={20}
              className={
                isFavorite(item._id)
                  ? "fill-current text-red-500"
                  : "text-gray-600"
              }
            />
          </button>
        )}
      </div>
      <div className="flex flex-grow flex-col p-4">
        <div className="flex items-start justify-between">
          <h2 className="truncate pr-2 text-xl font-bold text-gray-800">
            {item.name}
          </h2>
          <div className="flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-0.5 text-sm font-bold text-gray-800">
            <Star size={14} />
            <span>{item.rating?.toFixed(1) || "New"}</span>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={14} /> {item.area}, {item.city}
        </div>
        <p className="my-3 line-clamp-3 flex-grow text-sm text-gray-600">
          {item.description}
        </p>

        {item.priceForTwo && (
          <div className="mt-2 text-base font-semibold text-gray-900">
            {formatIndianCurrency(item.priceForTwo)} for two
          </div>
        )}

        {item.pricePerNight && (
          <div className="mt-2 flex items-center gap-2 text-base font-semibold text-gray-900">
            <BedDouble size={16} />
            <span>{formatIndianCurrency(item.pricePerNight)} / night</span>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 border-t pt-2">
          {item.priceCategory && (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              {item.priceCategory}
            </span>
          )}
          {item.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cyan-100 px-2 py-1 text-xs text-cyan-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
