import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;