
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { getTrendingMovies, getNowPlayingMovies } from '@/services/tmdb';

export const useMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const [trending, nowPlaying] = await Promise.all([
          getTrendingMovies(),
          getNowPlayingMovies(),
        ]);
        
        setTrendingMovies(trending);
        setNewReleases(nowPlaying);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return {
    trendingMovies,
    newReleases,
    isLoading,
    error,
  };
};
