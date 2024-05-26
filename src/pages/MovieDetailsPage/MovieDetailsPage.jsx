import { useState, useEffect } from 'react';
import { useParams, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast.jsx';
import MovieReviews from '../../components/MovieReviews/MovieReviews.jsx';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjIzNzI0ZDJmZjAwYzZlZTYxOGU5MzY1NGRjZThkZiIsInN1YiI6IjY2NTJhZmIyZGMwNDE4ZTY1NWM2MWEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5DMm9YHY0rIvMdOwO7InUm5y74KZTyLiJD3y0IDd4mU',
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      {movie && (
        <>
          <button onClick={() => navigate(location?.state?.from || '/movies')}>Go back</button>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <ul>
            <li><Link to="cast">Cast</Link></li>
            <li><Link to="reviews">Reviews</Link></li>
          </ul>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;