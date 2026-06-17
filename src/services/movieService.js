import api, { USE_MOCK } from './config';
import { dbMock } from './dbMock';
import { getMovieVisuals } from './normalizer';

const transformMovie = (m) => {
  const title = m.Title || m.title || '';
  const visuals = getMovieVisuals(title);
  return {
    id: m.MovieId || m.id,
    title,
    genre: m.Genre || m.genre || '',
    duration: m.Duration ? `${m.Duration} min` : m.duration,
    language: m.Language || m.language,
    releaseDate: m.ReleaseDate || m.releaseDate,
    rating: m.Rating || m.rating,
    cast: m.MovieCast || m.cast || '',
    status: m.IsActive == 1 ? 'Now Showing' : 'Coming Soon',
    poster: m.poster || visuals.poster,
    banner: m.banner || visuals.banner,
    synopsis: m.synopsis || `${title} - ${m.Genre || m.genre || ''} film starring ${m.MovieCast || m.cast || ''}`,
  };
};

export const movieService = {
  getMovies: async () => {
    if (USE_MOCK) return dbMock.getMovies();
    const response = await api.get('/movies');
    return response.data.map(transformMovie);
  },
  getMovieById: async (id) => {
    if (USE_MOCK) return dbMock.getMovieById(id);
    const response = await api.get(`/movies/${id}`);
    return transformMovie(response.data);
  },
  addMovie: async (movie) => {
    if (USE_MOCK) return dbMock.addMovie(movie);
    const response = await api.post('/movies', movie);
    return response.data;
  },
  updateMovie: async (id, movie) => {
    if (USE_MOCK) return dbMock.updateMovie(id, movie);
    const response = await api.put(`/movies/${id}`, movie);
    return response.data;
  },
  deleteMovie: async (id) => {
    if (USE_MOCK) return dbMock.deleteMovie(id);
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  },
};

export default movieService;