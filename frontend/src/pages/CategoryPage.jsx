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
  const [sort, setSort] = useState("-rating");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/places?category=${category}&page=${page}&sort=${sort}`
        );
        setItems(res.data.data || []);
        setPages(res.data.pages);
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category, page, sort]);

  const sortOptions = [
    { label: "Highest Rated", value: "-rating" },
    { label: "Price (Low to High)", value: "priceForTwo" },
    { label: "Price (High to Low)", value: "-priceForTwo" },
  ];

  if (category === "Hotel" || category === "Guesthouse") {
    sortOptions[1] = { label: "Price (Low to High)", value: "pricePerNight" };
    sortOptions[2] = { label: "Price (High to Low)", value: "-pricePerNight" };
  } else if (category === "Attraction") {
    sortOptions.splice(1, 2);
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 md:px-10 py-12">
      <div className="text-center mb-6 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="text-lg mt-2 text-gray-600">{description}</p>
      </div>
      <div className="max-w-7xl mx-auto flex justify-end mb-4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Spinner />
      ) : items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <Cards key={item._id} item={item} onItemClick={setSelectedItem} />
            ))}
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      ) : (
        <p className="text-center text-gray-500 py-16">
          No {title.toLowerCase()} found.
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
}

export default CategoryPage;
