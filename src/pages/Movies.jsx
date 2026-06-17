import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Filter, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieImage from '../components/MovieImage';
import movieService from '../services/movieService';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const list = await movieService.getMovies();
        setMovies(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Filter lists
const genres = ['All', ...new Set(movies.flatMap(m => (m.genre || '').split(', ').map(g => g.trim())))];  const languages = ['All', ...new Set(movies.map(m => m.language))];

  // Filtering Logic
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = (movie.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                      (movie.cast || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);
    
    const matchesLang = selectedLanguage === 'All' || movie.language === selectedLanguage;
    
    const matchesStatus = selectedStatus === 'All' || movie.status === selectedStatus;

    return matchesSearch && matchesGenre && matchesLang && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cinema-bg pt-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">Movie Catalog</h1>
          <p className="text-cinema-gray text-sm mt-2">Explore now showing and upcoming movies in CineGold branches</p>
          <div className="w-16 h-1 bg-cinema-red mt-2"></div>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-3.5 text-cinema-gray" size={18} />
              <input
                type="text"
                placeholder="Search movies by title, cast..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-cinema-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cinema-gold transition-colors duration-300"
              />
            </div>

            {/* Filter Toggle Headers */}
            <div className="flex items-center gap-2 text-sm text-cinema-gray self-start md:self-auto">
              <SlidersHorizontal size={16} className="text-cinema-gold" />
              <span>Filters & Sorting</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Genre Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold text-cinema-gold uppercase tracking-wider">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-cinema-bg border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cinema-gold"
              >
                {genres.map(g => (
                  <option key={g} value={g} className="bg-cinema-card">{g}</option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold text-cinema-gold uppercase tracking-wider">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-cinema-bg border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cinema-gold"
              >
                {languages.map(l => (
                  <option key={l} value={l} className="bg-cinema-card">{l}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold text-cinema-gold uppercase tracking-wider">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-cinema-bg border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cinema-gold"
              >
                <option value="All" className="bg-cinema-card">All Movies</option>
                <option value="Now Showing" className="bg-cinema-card">Now Showing</option>
                <option value="Coming Soon" className="bg-cinema-card">Coming Soon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="text-center py-20 text-cinema-gray text-lg">Loading catalogue...</div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20 text-cinema-gray text-lg glass-panel rounded-2xl border border-white/5">
            No movies found matching your filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-cinema-card rounded-2xl overflow-hidden border border-white/5 flex flex-col group h-full"
              >
                {/* Poster Container */}
                <div className="relative poster-aspect overflow-hidden">
                  <MovieImage
                    src={movie.poster}
                    alt={movie.title}
                    type="poster"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {movie.status === 'Now Showing' ? (
                    <div className="absolute top-4 right-4 bg-cinema-bg/85 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 text-xs text-cinema-gold font-bold border border-cinema-gold/20">
                      <Star size={12} className="fill-cinema-gold" /> {movie.rating}
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-cinema-gold/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-cinema-bg font-extrabold border border-cinema-gold/20 uppercase tracking-wide">
                      Coming Soon
                    </div>
                  )}
                </div>

                {/* Details Container */}
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs text-cinema-gold font-medium mb-1 uppercase tracking-widest">{movie.genre}</span>
                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cinema-red transition-colors duration-300">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-cinema-gray mb-3">
                    <span className="flex items-center gap-1"><Clock size={12} /> {movie.duration}</span>
                    <span>•</span>
                    <span>{movie.language}</span>
                  </div>
                  
                  {/* Cast Info */}
                  <p className="text-cinema-gray text-xs line-clamp-2 leading-relaxed mb-6">
                    <strong className="text-white/80">Cast: </strong>{movie.cast}
                  </p>

                  {/* Booking Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <Link
                      to={`/movies/${movie.id}`}
                      className="bg-white/5 hover:bg-white/10 text-center py-2.5 rounded-lg text-xs font-semibold transition-colors duration-300 border border-white/10"
                    >
                      Details
                    </Link>
                    {movie.status === 'Now Showing' ? (
                      <Link
                        to={`/book?movieId=${movie.id}`}
                        className="bg-cinema-red hover:bg-red-700 text-center py-2.5 rounded-lg text-xs font-semibold text-white transition-all duration-300 glow-red"
                      >
                        Book Ticket
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="bg-white/5 text-cinema-gray/50 cursor-not-allowed text-center py-2.5 rounded-lg text-xs font-semibold border border-white/5"
                      >
                        Unavailable
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
