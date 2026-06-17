import api from './config';

export const movieService = {
  getMovies: async () => {
    const res = await api.get('/movies');
    return res.data;
  },
  getMovieById: async (id) => {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  },
  addMovie: async (movie) => {
    const res = await api.post('/movies', movie);
    return res.data;
  },
  updateMovie: async (id, movie) => {
    const res = await api.put(`/movies/${id}`, movie);
    return res.data;
  },
  deleteMovie: async (id) => {
    const res = await api.delete(`/movies/${id}`);
    return res.data;
  },
};

export default movieService;