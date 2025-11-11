import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/cards/Cards';
import Spinner from '../components/shared/Spinner';
import DetailsModal from '../components/DetailsModal';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`${API_BASE}/user/favorites`);
        setFavorites(res.data);
      } catch (error) {
        console.error('Failed to fetch favorites', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 md:px-10 py-12">
      <div className="text-center mb-10 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold">My Favorites</h1>
        <p className="text-lg mt-2 text-gray-600">All the places you've saved in one spot.</p>
      </div>
      {loading ? <Spinner /> : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((item) => (
            <Cards key={item._id} item={item} onItemClick={setSelectedItem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">You haven't added any favorites yet.</p>
      )}
      {selectedItem && <DetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default Favorites;