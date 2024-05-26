import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'));

function App() {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;