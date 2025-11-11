import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/cards/Cards";
import Spinner from "../components/shared/Spinner";
import Pagination from "../components/shared/Pagination";
import DetailsModal from "../components/DetailsModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

function CategoryPage({ category, title, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/places?category=${category}&page=${page}`);
        setItems(res.data.data || []);
        setPages(res.data.pages);
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category, page]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 md:px-10 py-12">
      <div className="text-center mb-10 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="text-lg mt-2 text-gray-600">{description}</p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => <Cards key={item._id} item={item} onItemClick={setSelectedItem} />)}
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}
      {selectedItem && <DetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}

export default CategoryPage;