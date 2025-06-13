
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { MovieCard } from "@/components/MovieCard";
import { EmptyState } from "@/components/EmptyState";
import { SearchInput } from "@/components/SearchInput";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites, removeFromFavorites } = useFavorites();

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/favorites" className="text-foreground hover:text-primary transition-colors">
                Favorites
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              className="hidden md:block"
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
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="pt-20 container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Favorites</h1>
        
        {favorites.length === 0 ? (
          <EmptyState />
        ) : filteredFavorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mb-6">
              <div className="text-6xl opacity-50">🎬🔍</div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Data Not Found</h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              Try other keywords
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFavorites.map((movie) => (
              <div key={movie.id} className="flex flex-col md:flex-row gap-4 p-4 bg-card rounded-lg border border-border">
                <div className="flex-shrink-0">
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-24 h-36 md:w-32 md:h-48 object-cover rounded-lg"
                    />
                  </Link>
                </div>
                
                <div className="flex-1 space-y-2">
                  <Link to={`/movie/${movie.id}`}>
                    <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span className="text-sm">⭐</span>
                    <span className="text-sm font-medium text-foreground">
                      {movie.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {movie.overview}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Watch Trailer ▶
                    </button>
                    
                    <button
                      onClick={() => removeFromFavorites(movie.id)}
                      className="p-2 text-red-600 hover:bg-red-600/10 rounded-lg transition-colors"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default Favorites;
