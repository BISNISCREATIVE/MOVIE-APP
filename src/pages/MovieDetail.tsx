
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, Menu, Heart, Play, Calendar, Star, Users } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { CastMember } from "@/components/CastMember";
import { TrailerPlayer } from "@/components/TrailerPlayer";
import { useFavorites } from "@/hooks/useFavorites";
import { useMovieDetail } from "@/hooks/useMovieDetail";
import { getMovieVideos } from "@/services/tmdb";
import { toast } from "@/hooks/use-toast";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string>("");
  const { movie, cast, isLoading } = useMovieDetail(id);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = movie ? favorites.some(fav => fav.id === movie.id) : false;

  const handleToggleFavorite = () => {
    if (!movie) return;
    
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
      toast({
        title: "Success Add to Favorites",
        description: `${movie.title} has been added to your favorites.`,
      });
    }
  };

  const handleWatchTrailer = async () => {
    if (!id) return;
    
    try {
      const videos = await getMovieVideos(id);
      const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        toast({
          title: "Trailer not available",
          description: "Sorry, no trailer is available for this movie.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error loading trailer",
        description: "Failed to load movie trailer.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || !movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading movie details...</p>
        </div>
      </div>
    );
  }

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

      {/* Hero Section */}
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
            
            <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
              <button 
                onClick={handleWatchTrailer}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Trailer
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`p-3 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mb-1">Rating</div>
                <div className="font-bold text-white">{movie.vote_average.toFixed(1)}/10</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="w-6 h-6 bg-blue-500 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">G</span>
                </div>
                <div className="text-sm text-gray-300 mb-1">Genre</div>
                <div className="font-bold text-white text-sm">
                  {movie.genres?.length > 0 ? movie.genres[0].name : 'Action'}
                </div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mb-1">Age Limit</div>
                <div className="font-bold text-white">13</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Trailer Player */}
        {showTrailer && trailerKey && (
          <TrailerPlayer 
            videoKey={trailerKey} 
            onClose={() => setShowTrailer(false)} 
          />
        )}

        {/* Overview */}
        <section className="mb-12 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Overview</h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            {movie.overview}
          </p>
        </section>

        {/* Cast & Crew */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Cast & Crew</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {cast.slice(0, 10).map((person) => (
              <CastMember key={person.id} person={person} />
            ))}
          </div>
        </section>
      </div>

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

export default MovieDetail;
