import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { MovieGrid } from './components/MovieGrid';
import { fetchMovies } from './services/movieService';
import type { DisneyMovie } from './types/movie';

function App() {
  const [movies, setMovies] = useState<DisneyMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data);
      setLoading(false);
    }
    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <MovieGrid movies={movies} loading={loading} />
      </main>
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            A magical collection of Disney movies through the years
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
