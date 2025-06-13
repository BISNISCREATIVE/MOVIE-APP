
import { useState, useEffect } from 'react';
import { MovieDetail, CastMember } from '@/types/movie';
import { getMovieDetail, getMovieCredits } from '@/services/tmdb';

export const useMovieDetail = (id: string | undefined) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        const [movieData, creditsData] = await Promise.all([
          getMovieDetail(id),
          getMovieCredits(id),
        ]);
        
        setMovie(movieData);
        setCast(creditsData);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  return {
    movie,
    cast,
    isLoading,
    error,
  };
};
