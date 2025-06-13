
import { MovieCard } from "./MovieCard";
import { Movie } from "@/types/movie";
import { Skeleton } from "./ui/skeleton";

interface SearchResultsProps {
  results: Movie[];
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
  isLoading: boolean;
  hasSearched: boolean;
}

export const SearchResults = ({ 
  results, 
  favorites, 
  onToggleFavorite, 
  isLoading, 
  hasSearched 
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Searching...</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-60 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mb-6">
            <div className="text-6xl opacity-50">🎬🔍</div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Data Not Found</h3>
          <p className="text-muted-foreground mb-8 max-w-md">
            Try other keywords
          </p>
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Search Results</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.some(fav => fav.id === movie.id)}
            onToggleFavorite={() => onToggleFavorite(movie)}
          />
        ))}
      </div>
    </div>
  );
};
