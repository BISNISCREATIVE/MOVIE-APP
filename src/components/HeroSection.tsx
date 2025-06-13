
import { Play, Heart } from "lucide-react";
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
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {movie.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3">
            {movie.overview}
          </p>
          
          <div className="flex items-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Play className="w-5 h-5" />
              Watch Trailer
            </button>
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
