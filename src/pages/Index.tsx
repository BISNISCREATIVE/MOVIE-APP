
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, Heart } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { HeroSection } from "@/components/HeroSection";
import { MovieSection } from "@/components/MovieSection";
import { MobileMenu } from "@/components/MobileMenu";
import { useMovies } from "@/hooks/useMovies";
import { useFavorites } from "@/hooks/useFavorites";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trendingMovies, newReleases, isLoading, isLoadingMore, loadMoreMovies, hasMore } = useMovies();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const featuredMovie = trendingMovies[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              🎬 Movie
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/favorites" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Favorites
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search Movie"
                className="bg-muted/50 backdrop-blur-sm rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/50"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        {featuredMovie && (
          <HeroSection 
            movie={featuredMovie}
            isFavorite={favorites.some(fav => fav.id === featuredMovie.id)}
            onToggleFavorite={() => {
              if (favorites.some(fav => fav.id === featuredMovie.id)) {
                removeFromFavorites(featuredMovie.id);
              } else {
                addToFavorites(featuredMovie);
              }
            }}
          />
        )}

        {/* Trending Now */}
        <MovieSection
          title="Trending Now"
          movies={trendingMovies.slice(0, 5)}
          favorites={favorites}
          onToggleFavorite={(movie) => {
            if (favorites.some(fav => fav.id === movie.id)) {
              removeFromFavorites(movie.id);
            } else {
              addToFavorites(movie);
            }
          }}
        />

        {/* New Release */}
        <MovieSection
          title="New Release"
          movies={newReleases}
          favorites={favorites}
          onToggleFavorite={(movie) => {
            if (favorites.some(fav => fav.id === movie.id)) {
              removeFromFavorites(movie.id);
            } else {
              addToFavorites(movie);
            }
          }}
          showLoadMore
          onLoadMore={loadMoreMovies}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
        />
         // Infinite scroll with improved performance
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000 &&
        hasMore &&
        !isLoading &&
        !isLoadingMore
      ) {
        loadMore();
      }
    };

    const throttledScroll = throttle(handleScroll, 200);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [loadMore, hasMore, isLoading, isLoadingMore]);

  // Throttle function for better performance
  const throttle = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    return function (...args: any[]) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  };
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              🎬 Movie
            </div>
            <p className="text-muted-foreground text-sm">
              Copyright ©2025 Movie Explorer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
