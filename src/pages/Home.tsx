
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdbApi, Movie } from '@/services/tmdbApi';
import { MovieCard } from '@/components/MovieCard';
import { HeroSection } from '@/components/HeroSection';
import { TrendingSection } from '@/components/TrendingSection';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => tmdbApi.getPopularMovies(page),
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
        setIsLoadingMore(false);
      }
      setHasMore(page < data.total_pages);
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
    }
  }, [hasMore, isLoading, isLoadingMore]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading movies</h2>
          <p className="text-gray-400 mb-4">Failed to fetch movies from TMDB API</p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center">
          <Loader2 className="w-8 h-8 animate-spin mr-2" />
          <span>Loading popular movies...</span>
        </div>
      </div>
    );
  }

  const featuredMovie = movies[0];
  const trendingMovies = movies.slice(1, 7);
  const newReleaseMovies = movies.slice(7);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      {featuredMovie && <HeroSection movie={featuredMovie} />}
      
      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Now */}
        {trendingMovies.length > 0 && (
          <TrendingSection movies={trendingMovies} title="Trending Now" />
        )}

        {/* New Release */}
        {newReleaseMovies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">New Release</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {newReleaseMovies.map((movie) => (
                <MovieCard key={`${movie.id}-${movies.indexOf(movie)}`} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Loading More */}
        {(isLoadingMore || (isLoading && page > 1)) && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">Loading more movies...</span>
          </div>
        )}

        {/* End of List */}
        {!hasMore && movies.length > 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>You've reached the end of the list!</p>
            <p className="text-sm mt-2">Total movies loaded: {movies.length}</p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !isLoading && !isLoadingMore && movies.length > 0 && (
          <div className="text-center py-8">
            <Button onClick={loadMore} variant="outline">
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Index;
