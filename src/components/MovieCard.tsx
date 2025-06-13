
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  showIndex?: boolean;
  index?: number;
}

export const MovieCard = ({ movie, isFavorite, onToggleFavorite, showIndex, index }: MovieCardProps) => {
  return (
    <div className="group relative">
      {showIndex && (
        <div className="absolute -left-4 top-4 z-10 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          {index}
        </div>
      )}
      
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[2/3] mb-3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-600 text-white' 
                : 'bg-black/50 text-white hover:bg-red-600'
            } opacity-0 group-hover:opacity-100`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Link>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium text-foreground">
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
      </div>
    </div>
  );
};
