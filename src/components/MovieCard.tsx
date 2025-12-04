import { Calendar, Star, User } from 'lucide-react';
import type { DisneyMovie } from '../types/movie';

interface MovieCardProps {
  movie: DisneyMovie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400">
        {movie.image_url ? (
          <img
            src={movie.image_url}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-6xl">🎬</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{movie.title}</h3>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{movie.year}</span>
          </div>
          {movie.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{movie.rating}/10</span>
            </div>
          )}
        </div>

        {movie.genre && (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
            {movie.genre}
          </span>
        )}

        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {movie.description}
        </p>

        {movie.director && (
          <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
            <User className="w-4 h-4" />
            <span>Directed by {movie.director}</span>
          </div>
        )}
      </div>
    </div>
  );
}
