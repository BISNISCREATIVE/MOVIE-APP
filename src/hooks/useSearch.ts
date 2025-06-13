
import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@/types/movie';
import { searchMovies } from '@/services/tmdb';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMoviesHandler = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const searchResults = await searchMovies(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching movies:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMoviesHandler(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, searchMoviesHandler]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    hasSearched,
    searchMovies: searchMoviesHandler,
  };
};
