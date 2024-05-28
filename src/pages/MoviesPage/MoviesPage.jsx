import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList.jsx';
import './MoviesPage.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    if (searchQuery) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              query: searchQuery,
              include_adult: false,
              language: 'en-US',
              page: 1,
            },
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjIzNzI0ZDJmZjAwYzZlZTYxOGU5MzY1NGRjZThkZiIsInN1YiI6IjY2NTJhZmIyZGMwNDE4ZTY1NWM2MWEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5DMm9YHY0rIvMdOwO7InUm5y74KZTyLiJD3y0IDd4mU',
            },
          });
          setMovies(response.data.results);
        } catch (error) {
          console.error('Failed to search movies', error);
        }
      };

      fetchMovies();
    }
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query) {
      setSearchParams({ query });
    }
  };

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;