import { MovieCard } from './MovieCard';
import type { DisneyMovie } from '../types/movie';

interface MovieGridProps {
  movies: DisneyMovie[];
  loading: boolean;
}

export function MovieGrid({ movies, loading }: MovieGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading magical movies...</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-600">No movies found</p>
        <p className="text-gray-500 mt-2">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
