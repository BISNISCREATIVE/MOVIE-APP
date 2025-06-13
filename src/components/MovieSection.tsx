
import { useState } from "react";
import { MovieCard } from "./MovieCard";
import { Movie } from "@/types/movie";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
  showIndexes?: boolean;
  showLoadMore?: boolean;
}

export const MovieSection = ({ 
  title, 
  movies, 
  favorites, 
  onToggleFavorite, 
  showIndexes = false,
  showLoadMore = false 
}: MovieSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayMovies = showAll ? movies : movies.slice(0, showIndexes ? 5 : 8);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">{title}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {displayMovies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.some(fav => fav.id === movie.id)}
            onToggleFavorite={() => onToggleFavorite(movie)}
            showIndex={showIndexes}
            index={showIndexes ? index + 1 : undefined}
          />
        ))}
      </div>

      {showLoadMore && movies.length > 8 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg transition-colors"
          >
            {showAll ? 'Show Less' : 'Load More'}
          </button>
        </div>
      )}
    </section>
  );
};
