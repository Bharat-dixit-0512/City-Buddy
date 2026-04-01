import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import {
  X,
  Star,
  MapPin,
  Heart,
  Wallet,
  BedDouble,
  Phone,
  Globe,
  Navigation,
  Edit,
  Building,
} from "lucide-react";
import Reviews from "./Reviews";
import { userAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import OptimizedImage from "./shared/OptimizedImage";
import { api, getCached } from "../services/api";
import {
  formatIndianCurrency,
  getPlaceCoordinates,
} from "../utils/placeUtils";

const DetailsModal = ({ item, onClose }) => {
  const { authUser, isFavorite, toggleFavorite } = userAuth();
  const [details, setDetails] = useState(item);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const { register, handleSubmit, reset: resetEdit } = useForm();
  const {
    register: registerClaim,
    handleSubmit: handleSubmitClaim,
    reset: resetClaim,
  } = useForm();

  useEffect(() => {
    setDetails(item);

    if (!item?._id) {
      return undefined;
    }

    const controller = new AbortController();

    const fetchPlaceDetails = async () => {
      try {
        setLoading(true);
        const data = await getCached(`/places/${item._id}`, {
          ttl: 2 * 60_000,
          signal: controller.signal,
        });
        setDetails(data);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error("Failed to fetch place details", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();

    return () => controller.abort();
  }, [item]);

  const activeItem = details || item;

  if (!activeItem) {
    return null;
  }

  const coordinates = getPlaceCoordinates(activeItem);
  const directionsUrl = coordinates
    ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
    : null;

  const onEditSubmit = async (data) => {
    try {
      await api.post(`/places/${activeItem._id}/suggest-edit`, {
        suggestion: data.suggestion,
      });
      toast.success("Thank you! Your suggestion has been submitted for review.");
      setShowEditForm(false);
      resetEdit();
    } catch {
      toast.error("Failed to submit suggestion.");
    }
  };

  const onClaimSubmit = async (data) => {
    try {
      await api.post(`/claims`, {
        placeId: activeItem._id,
        message: data.message,
      });
      toast.success("Your claim request has been submitted for review.");
      setShowClaimForm(false);
      resetClaim();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit claim.");
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl lg:grid-cols-2">
        <button
          className="absolute right-4 top-4 z-20 rounded-full bg-white/70 p-1 text-gray-500 hover:text-black"
          onClick={onClose}
          type="button"
        >
          <X size={24} />
        </button>
        <div className="relative h-64 lg:h-full">
          <OptimizedImage
            alt={activeItem.name}
            className="absolute h-full w-full object-cover"
            containerClassName="absolute inset-0"
            priority
            src={activeItem.image}
          />
          {authUser && (
            <button
              className="absolute left-4 top-4 z-10 rounded-full bg-white p-2 shadow-md"
              onClick={() => toggleFavorite(activeItem._id)}
              type="button"
            >
              <Heart
                size={20}
                className={
                  isFavorite(activeItem._id)
                    ? "fill-current text-red-500"
                    : "text-gray-600"
                }
              />
            </button>
          )}
          {loading && (
            <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
              Loading details...
            </div>
          )}
        </div>
        <div className="flex h-full max-h-[90vh] flex-col p-6 md:p-8 lg:max-h-full">
          <div className="flex-shrink-0">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              {activeItem.name}
            </h2>
            <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5 font-bold text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span>
                  {activeItem.rating?.toFixed(1) || "New"} (
                  {activeItem.reviewCount || 0} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{activeItem.city}</span>
              </div>
            </div>
          </div>

          <div className="-mr-2 my-4 flex-grow overflow-y-auto pr-2">
            {activeItem.priceForTwo && (
              <div className="mb-4 flex items-center gap-2 text-lg font-medium text-gray-800">
                <Wallet size={20} className="text-green-600" />
                <span>
                  {formatIndianCurrency(activeItem.priceForTwo)} for two people
                </span>
              </div>
            )}
            {activeItem.pricePerNight && (
              <div className="mb-4 flex items-center gap-2 text-lg font-medium text-gray-800">
                <BedDouble size={20} className="text-blue-600" />
                <span>
                  {formatIndianCurrency(activeItem.pricePerNight)} / night
                </span>
              </div>
            )}
            <p className="mb-4 text-base leading-relaxed text-gray-700">
              {activeItem.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {activeItem.priceCategory && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {activeItem.priceCategory}
                </span>
              )}
              {activeItem.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cyan-100 px-2 py-1 text-xs text-cyan-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="my-4 space-y-2">
              {activeItem.phone && (
                <a
                  href={`tel:${activeItem.phone}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
                >
                  <Phone size={16} />
                  <span>{activeItem.phone}</span>
                </a>
              )}
              {activeItem.website && (
                <a
                  href={activeItem.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
                >
                  <Globe size={16} />
                  <span>Visit Website</span>
                </a>
              )}
              {directionsUrl && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
                >
                  <Navigation size={16} />
                  <span>Get Directions</span>
                </a>
              )}
              {authUser && (
                <button
                  onClick={() => {
                    setShowEditForm(!showEditForm);
                    setShowClaimForm(false);
                  }}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600"
                  type="button"
                >
                  <Edit size={14} />
                  <span>Suggest an Edit</span>
                </button>
              )}
              {authUser && !activeItem.claimedBy && (
                <button
                  onClick={() => {
                    setShowClaimForm(!showClaimForm);
                    setShowEditForm(false);
                  }}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600"
                  type="button"
                >
                  <Building size={14} />
                  <span>Claim this Business</span>
                </button>
              )}
            </div>
            {showEditForm && (
              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="my-4 space-y-2 rounded-lg bg-gray-50 p-3"
              >
                <textarea
                  {...register("suggestion", { required: true })}
                  placeholder="What needs to be corrected?"
                  rows={2}
                  className="w-full rounded-md border p-2"
                />
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white"
                >
                  Submit Suggestion
                </button>
              </form>
            )}
            {showClaimForm && (
              <form
                onSubmit={handleSubmitClaim(onClaimSubmit)}
                className="my-4 space-y-2 rounded-lg bg-gray-50 p-3"
              >
                <textarea
                  {...registerClaim("message")}
                  placeholder="Add a message for the admins (optional)"
                  rows={2}
                  className="w-full rounded-md border p-2"
                />
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white"
                >
                  Submit Claim Request
                </button>
              </form>
            )}
          </div>

          <div className="flex-shrink-0 border-t pt-4">
            <Reviews
              itemId={activeItem._id}
              placeOwnerId={activeItem.claimedBy}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default DetailsModal;
