import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for places..."
        className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-[#FF7B54] focus:outline-none"
      />
      <button type="submit" className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-[#FF7B54]">
        <Search size={20} />
      </button>
    </form>
  );
};

export default Searchbar;