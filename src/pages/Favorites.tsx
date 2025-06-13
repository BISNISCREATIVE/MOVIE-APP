
import { Link } from "react-router-dom";
import { Search, Menu, Heart } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { MovieCard } from "@/components/MovieCard";
import { EmptyState } from "@/components/EmptyState";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites, removeFromFavorites } = useFavorites();

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
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Home
              </Link>
              <Link to="/favorites" className="text-foreground hover:text-primary transition-colors font-medium">
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
      <main className="pt-20 container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Favorites</h1>
        
        {favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={true}
                onToggleFavorite={() => removeFromFavorites(movie.id)}
              />
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
