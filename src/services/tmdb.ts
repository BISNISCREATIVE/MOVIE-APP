
import axios from 'axios';
import { Movie, MovieDetail, CastMember } from '@/types/movie';

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzE1OGI0OWI4OTQzOTU1ZjI4MTViN2I5OWUwYTY3OCIsIm5iZiI6MTc0OTcwOTE1MC44MDksInN1YiI6IjY4NGE3MTVlZjZlZDExNzg0MjM0Mzc2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QlnOilr_89KQE6HpxV611Jz_h0tRXgk64GT7I2LNQJ4';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'accept': 'application/json',
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

export const getNowPlayingMovies = async (page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await tmdbApi.get('/movie/now_playing', {
    params: { page }
  });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages
  };
};

export const getMovieDetail = async (id: string): Promise<MovieDetail> => {
  const response = await tmdbApi.get(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id: string): Promise<CastMember[]> => {
  const response = await tmdbApi.get(`/movie/${id}/credits`);
  return response.data.cast;
};

export const getMovieVideos = async (id: string): Promise<any[]> => {
  const response = await tmdbApi.get(`/movie/${id}/videos`);
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const getGenres = async (): Promise<{ id: number; name: string }[]> => {
  const response = await tmdbApi.get('/genre/movie/list');
  return response.data.genres;
};
