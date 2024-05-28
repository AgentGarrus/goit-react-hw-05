import { useState, useEffect } from 'react';
import { useParams, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast.jsx';
import MovieReviews from '../../components/MovieReviews/MovieReviews.jsx';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjIzNzI0ZDJmZjAwYzZlZTYxOGU5MzY1NGRjZThkZiIsInN1YiI6IjY2NTJhZmIyZGMwNDE4ZTY1NWM2MWEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5DMm9YHY0rIvMdOwO7InUm5y74KZTyLiJD3y0IDd4mU'
          }
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="movie-details">
      {movie && (
        <>
          <button onClick={() => navigate('/')} className="go-back-button">Go back</button>
          <div className="movie-info">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
            <div className="movie-details-text">
              <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
              <p><strong>User Score: </strong>{Math.round(movie.vote_average * 10)}%</p>
              <p><strong>Overview: </strong>{movie.overview}</p>
              <p><strong>Genres: </strong>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
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