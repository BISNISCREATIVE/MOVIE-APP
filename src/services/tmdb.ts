
import axios from 'axios';
import { Movie, MovieDetail, CastMember } from '@/types/movie';

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63'; // Demo key - replace with your own
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get('/trending/movie/week');
  return response.data.results;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get('/movie/popular');
  return response.data.results;
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get('/movie/now_playing');
  return response.data.results;
};

export const getMovieDetail = async (id: string): Promise<MovieDetail> => {
  const response = await tmdbApi.get(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id: string): Promise<CastMember[]> => {
  const response = await tmdbApi.get(`/movie/${id}/credits`);
  return response.data.cast;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};
