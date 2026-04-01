import { useEffect, useState } from "react";
import Cards from "../components/cards/Cards";
import Spinner from "../components/shared/Spinner";
import Pagination from "../components/shared/Pagination";
import DetailsModal from "../components/DetailsModal";
import { getCached } from "../services/api";

function CategoryPage({ category, title, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState("-rating");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      setLoading(true);

      try {
        const data = await getCached("/places", {
          params: { category, page, sort },
          ttl: 2 * 60_000,
          signal: controller.signal,
        });
        setItems(data.data || []);
        setPages(data.pages || 1);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error(`Error fetching ${category}:`, error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    return () => controller.abort();
  }, [category, page, sort]);

  const sortOptions =
    category === "Attraction"
      ? [{ label: "Highest Rated", value: "-rating" }]
      : category === "Hotel" || category === "Guesthouse"
        ? [
            { label: "Highest Rated", value: "-rating" },
            { label: "Price (Low to High)", value: "pricePerNight" },
            { label: "Price (High to Low)", value: "-pricePerNight" },
          ]
        : [
            { label: "Highest Rated", value: "-rating" },
            { label: "Price (Low to High)", value: "priceForTwo" },
            { label: "Price (High to Low)", value: "-priceForTwo" },
          ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-12 md:px-10">
      <div className="mb-6 pt-8 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-2 text-lg text-gray-600">{description}</p>
      </div>
      <div className="mx-auto mb-4 flex max-w-7xl justify-end">
        <select
          value={sort}
          onChange={(event) => {
            setPage(1);
            setSort(event.target.value);
          }}
          className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Spinner />
      ) : items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <Cards
                key={item._id}
                item={item}
                onItemClick={setSelectedItem}
              />
            ))}
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      ) : (
        <p className="py-16 text-center text-gray-500">
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
