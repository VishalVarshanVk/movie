import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!movie) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
              alt={movie.Title}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
            <div className="space-y-4">
              <p><span className="font-semibold">Year:</span> {movie.Year}</p>
              <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
              <p><span className="font-semibold">Director:</span> {movie.Director}</p>
              <p><span className="font-semibold">Cast:</span> {movie.Actors}</p>
              <p><span className="font-semibold">Plot:</span> {movie.Plot}</p>
              <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>
              <p><span className="font-semibold">Rating:</span> {movie.imdbRating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails; 