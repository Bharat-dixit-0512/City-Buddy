import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cards from '../components/cards/Cards';
import Spinner from '../components/shared/Spinner';
import DetailsModal from '../components/DetailsModal';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState({ restaurants: [], cafes: [], attractions: [], hotels: [], guesthouses: [] });
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/search?q=${query}`);
        const allResults = res.data; // This is the flat array from the backend

        const formattedResults = {
            restaurants: allResults.filter(item => item.category === 'Restaurant'),
            cafes: allResults.filter(item => item.category === 'Cafe'),
            attractions: allResults.filter(item => item.category === 'Attraction'),
            hotels: allResults.filter(item => item.category === 'Hotel'),
            guesthouses: allResults.filter(item => item.category === 'Guesthouse'),
        };
        
        setResults(formattedResults);
      } catch (error) {
        console.error('Search failed', error);
        toast.error("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const sections = [
    { title: "Restaurants", data: results.restaurants },
    { title: "Hotels", data: results.hotels },
    { title: "Guesthouses", data: results.guesthouses },
    { title: "Cafes", data: results.cafes },
    { title: "Attractions", data: results.attractions },
  ];

  const totalResults = sections.reduce((sum, section) => sum + section.data.length, 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 md:px-10 py-12">
      <div className="mb-10 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold">Search Results for "{query}"</h1>
        <p className="text-lg mt-2 text-gray-600">{totalResults} results found.</p>
      </div>
      {loading ? <Spinner /> : totalResults > 0 ? (
        <div className="space-y-12">
          {sections.map(section => section.data.length > 0 && (
            <div key={section.title}>
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {section.data.map(item => (
                  <Cards key={item._id} item={item} onItemClick={setSelectedItem} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg py-10">No results found for your search.</p>
      )}
      {selectedItem && <DetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default SearchResults;