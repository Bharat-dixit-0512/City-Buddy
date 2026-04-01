import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full rounded-full border border-transparent"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for places..."
        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-[#FF7B54] focus:outline-none hover:border-[#0077B6] hover:shadow-md"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 hover:bg-[#FFF1EC] hover:text-[#FF7B54]"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default Searchbar;
