
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { getTrendingMovies, getNowPlayingMovies } from '@/services/tmdb';

export const useMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const [trending, nowPlayingData] = await Promise.all([
          getTrendingMovies(),
          getNowPlayingMovies(1),
        ]);
        
        setTrendingMovies(trending);
        setNewReleases(nowPlayingData.results);
        setTotalPages(nowPlayingData.total_pages);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (currentPage >= totalPages || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      const data = await getNowPlayingMovies(nextPage);
      
      setNewReleases(prev => [...prev, ...data.results]);
      setCurrentPage(nextPage);
    } catch (err) {
      setError('Failed to load more movies');
      console.error('Error loading more movies:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return {
    trendingMovies,
    newReleases,
    isLoading,
    isLoadingMore,
    error,
    loadMoreMovies,
    hasMore: currentPage < totalPages,
  };
};
