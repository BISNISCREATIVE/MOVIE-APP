
import { Play, Heart, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Movie } from "@/types/movie";

interface HeroSectionProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const HeroSection = ({ movie, isFavorite, onToggleFavorite }: HeroSectionProps) => {
  return (
    <div className="relative h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-80 flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-2xl"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {movie.title}
          </h1>
          
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6 text-gray-300">
            <Calendar className="w-4 h-4" />
            <span>{new Date(movie.release_date).toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}</span>
          </div>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3">
            {movie.overview}
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Play className="w-5 h-5" />
              Watch Trailer
            </button>
            <Link
              to={`/movie/${movie.id}`}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              See Detail
            </Link>
            <button
              onClick={onToggleFavorite}
              className={`p-3 rounded-lg transition-colors ${
                isFavorite 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
