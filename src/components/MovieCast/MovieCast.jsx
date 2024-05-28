import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieCast.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjIzNzI0ZDJmZjAwYzZlZTYxOGU5MzY1NGRjZThkZiIsInN1YiI6IjY2NTJhZmIyZGMwNDE4ZTY1NWM2MWEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5DMm9YHY0rIvMdOwO7InUm5y74KZTyLiJD3y0IDd4mU',
          },
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Failed to fetch cast', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul className="cast-list">
        {cast.map((actor) => (
          <li key={actor.id} className="cast-item">
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="actor-image"
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <div className="actor-info">
              <h3>{actor.name}</h3>
              <p>as {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;