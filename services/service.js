import axios from 'axios';

//Popular movies
export const getPopularMovies = async () => {
  const res = await axios.get(
    'https://api.themoviedb.org/3/movie/popular?api_key=e1635f92f14285e03bf147f726f1f26e',
  );
  return res.data.results;
};

//Upcoming movies
export const getUpcomingMovies = async () => {
  const res = await axios.get(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=e1635f92f14285e03bf147f726f1f26e',
  );
  return res.data.results;
};

//Popular movies
export const getPopularTv = async () => {
  const res = await axios.get(
    'https://api.themoviedb.org/3/tv/popular?api_key=e1635f92f14285e03bf147f726f1f26e',
  );
  return res.data.results;
};

//Popular Family
export const getFmailyMovie = async () => {
  const res = await axios.get(
    'https://api.themoviedb.org/3/movie/now_playing?api_key=e1635f92f14285e03bf147f726f1f26e',
  );
  return res.data.results;
};

export const getMovie = async id => {
  const res = await axios.get(
    `https://api.themoviedb.org/3//movie/${id}?api_key=e1635f92f14285e03bf147f726f1f26e`,
  );
  return res.data;
};

//Search for Movie and Tv
export const searchMovieTv = async (query, type) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/${type}?api_key=e1635f92f14285e03bf147f726f1f26e&query=${query}`,
  );
  return res.data.results;
};
