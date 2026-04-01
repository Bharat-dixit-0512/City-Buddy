import { useEffect, useState } from "react";
import Cards from "../components/cards/Cards";
import Spinner from "../components/shared/Spinner";
import DetailsModal from "../components/DetailsModal";
import { api } from "../services/api";
import { userAuth } from "../context/useAuth";

const Favorites = () => {
  const { authUser } = userAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/user/favorites");
        setFavorites(res.data);
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [authUser?.favorites?.length]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-12 md:px-10">
      <div className="mb-10 pt-8 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">My Favorites</h1>
        <p className="mt-2 text-lg text-gray-600">
          All the places you've saved in one spot.
        </p>
      </div>
      {loading ? (
        <Spinner />
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((item) => (
            <Cards key={item._id} item={item} onItemClick={setSelectedItem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You haven't added any favorites yet.
        </p>
      )}
      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Favorites;
