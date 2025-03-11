import { useState } from 'react';

function SearchBar({ onSearch, onTypeChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="flex-1 p-2 border rounded-lg"
        />
        <select
          onChange={(e) => onTypeChange(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar; 