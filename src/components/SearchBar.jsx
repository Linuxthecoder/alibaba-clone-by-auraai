import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar({ large = false }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full ${large ? 'max-w-3xl' : 'max-w-xl'}`}>
      <input
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`flex-1 border-2 border-alibaba-orange rounded-l-lg focus:outline-none ${large ? 'px-6 py-4 text-lg' : 'px-4 py-2.5 text-sm'}`}
      />
      <button
        type="submit"
        className={`bg-alibaba-orange hover:bg-orange-700 text-white rounded-r-lg font-semibold transition-colors flex items-center gap-2 ${large ? 'px-10 py-4 text-lg' : 'px-6 py-2.5'}`}
      >
        <Search size={large ? 20 : 16} />
        Search
      </button>
    </form>
  );
}

