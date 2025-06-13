
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { toast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('movie-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem('movie-favorites', JSON.stringify(newFavorites));
    
    toast({
      title: "Success Add to Favorites",
      description: `${movie.title} has been added to your favorites.`,
    });
  };

  const removeFromFavorites = (movieId: number) => {
    const newFavorites = favorites.filter(fav => fav.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem('movie-favorites', JSON.stringify(newFavorites));
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };
};
