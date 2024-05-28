import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation();
  
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;