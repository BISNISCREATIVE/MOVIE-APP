
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { MovieSection } from "@/components/MovieSection";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchInput } from "@/components/SearchInput";
import { SearchResults } from "@/components/SearchResults";
import { useMovies } from "@/hooks/useMovies";
import { useFavorites } from "@/hooks/useFavorites";
import { useSearch } from "@/hooks/useSearch";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trendingMovies, newReleases, isLoading } = useMovies();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { query, setQuery, results, isLoading: isSearching, hasSearched } = useSearch();

  const featuredMovie = trendingMovies[0];

  const handleToggleFavorite = (movie: any) => {
    if (favorites.some(fav => fav.id === movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  // Show search results if user has searched
  if (hasSearched) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                🎬 Movie
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/favorites" className="text-muted-foreground hover:text-foreground transition-colors">
                  Favorites
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <SearchInput
                value={query}
                onChange={setQuery}
                className="hidden md:block"
                isLoading={isSearching}
              />
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
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          searchQuery={query}
          onSearchChange={setQuery}
          isSearchLoading={isSearching}
        />

        {/* Main Content */}
        <main className="pt-20">
          <SearchResults
            results={results}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isLoading={isSearching}
            hasSearched={hasSearched}
          />
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
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              🎬 Movie
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/favorites" className="text-muted-foreground hover:text-foreground transition-colors">
                Favorites
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchInput
              value={query}
              onChange={setQuery}
              className="hidden md:block"
              isLoading={isSearching}
            />
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
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        searchQuery={query}
        onSearchChange={setQuery}
        isSearchLoading={isSearching}
      />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        {featuredMovie && (
          <HeroSection 
            movie={featuredMovie}
            isFavorite={favorites.some(fav => fav.id === featuredMovie.id)}
            onToggleFavorite={() => handleToggleFavorite(featuredMovie)}
          />
        )}

        {/* Trending Now */}
        <MovieSection
          title="Trending Now"
          movies={trendingMovies.slice(0, 5)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* New Release */}
        <MovieSection
          title="New Release"
          movies={newReleases}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          showLoadMore
        />
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
