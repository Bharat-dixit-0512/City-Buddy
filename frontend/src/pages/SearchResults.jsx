import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Cards from "../components/cards/Cards";
import Spinner from "../components/shared/Spinner";
import DetailsModal from "../components/DetailsModal";
import { getCached } from "../services/api";

const emptyResults = {
  restaurants: [],
  cafes: [],
  attractions: [],
  hotels: [],
  guesthouses: [],
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState(emptyResults);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!query) {
      setResults(emptyResults);
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    const fetchResults = async () => {
      setLoading(true);

      try {
        const allResults = await getCached("/search", {
          params: { q: query },
          ttl: 60_000,
          signal: controller.signal,
        });

        setResults({
          restaurants: allResults.filter(
            (item) => item.category === "Restaurant"
          ),
          cafes: allResults.filter((item) => item.category === "Cafe"),
          attractions: allResults.filter(
            (item) => item.category === "Attraction"
          ),
          hotels: allResults.filter((item) => item.category === "Hotel"),
          guesthouses: allResults.filter(
            (item) => item.category === "Guesthouse"
          ),
        });
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error("Search failed", error);
          toast.error("Search failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

    return () => controller.abort();
  }, [query]);

  const sections = [
    { title: "Restaurants", data: results.restaurants },
    { title: "Hotels", data: results.hotels },
    { title: "Guesthouses", data: results.guesthouses },
    { title: "Cafes", data: results.cafes },
    { title: "Attractions", data: results.attractions },
  ];

  const totalResults = sections.reduce(
    (sum, section) => sum + section.data.length,
    0
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-12 md:px-10">
      <div className="mb-10 pt-8">
        <h1 className="text-3xl font-bold md:text-4xl">
          Search Results for "{query}"
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {totalResults} results found.
        </p>
      </div>
      {loading ? (
        <Spinner />
      ) : totalResults > 0 ? (
        <div className="space-y-12">
          {sections.map(
            (section) =>
              section.data.length > 0 && (
                <div key={section.title}>
                  <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {section.data.map((item) => (
                      <Cards
                        key={item._id}
                        item={item}
                        onItemClick={setSelectedItem}
                      />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <p className="py-10 text-center text-lg text-gray-500">
          No results found for your search.
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

export default SearchResults;
