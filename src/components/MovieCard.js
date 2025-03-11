import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={movie.Title}
          className="w-full h-96 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{movie.Title}</h3>
          <p className="text-gray-600">{movie.Year}</p>
          <span className="text-sm text-gray-500">{movie.Type}</span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard; 