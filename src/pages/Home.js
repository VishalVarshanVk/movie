import { useState, useEffect, useCallback } from 'react';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState('');

  const handleSearch = useCallback(async (searchQuery, movieType = type, pageNumber = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(searchQuery, pageNumber, movieType);
      
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, [type]);

  // Load initial movies when component mounts
  useEffect(() => {
    handleSearch('Marvel'); // Default search term when page loads
  }, [handleSearch]);

  // Handle search updates
  useEffect(() => {
    if (query) {
      handleSearch(query, type, page);
    }
  }, [query, type, page, handleSearch]);

  // Test the API when component mounts
  useEffect(() => {
    const testAPI = async () => {
      try {
        // Test with a sample search
        const result = await searchMovies();
        console.log('API Test Result:', result);
      } catch (error) {
        console.error('API Test Error:', error);
      }
    };

    testAPI();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar 
        onSearch={setQuery} 
        onTypeChange={setType}
      />
      
      {loading && (
        <div className="text-center py-4">Loading...</div>
      )}

      {error && (
        <div className="text-center text-red-500 py-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {totalResults > 10 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / 10)}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default Home; 