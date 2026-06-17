import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, Film, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieImage from '../components/MovieImage';
import movieService from '../services/movieService';
import bookingService from '../services/bookingService';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const mData = await movieService.getMovieById(id);
        setMovie(mData);

        const sData = await bookingService.getShowtimes();
        // Filter showtimes running for this movie
        const movieShowtimes = sData.filter(st => st.movieId === id);
        setShowtimes(movieShowtimes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-bg flex items-center justify-center text-white">
        Loading details...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-cinema-bg flex flex-col pt-20">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
          <Link to="/movies" className="text-cinema-gold hover:underline">Back to Movies</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Group showtimes by date
  const showtimesByDate = showtimes.reduce((acc, st) => {
    if (!acc[st.date]) {
      acc[st.date] = [];
    }
    acc[st.date].push(st);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col bg-cinema-bg pt-20">
      <Navbar />

      {/* Banner & Header */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <MovieImage
            src={movie.banner}
            alt={movie.title}
            type="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/70 to-transparent z-10"></div>
        </div>
        
        <div className="absolute left-0 bottom-0 w-full p-8 md:p-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/movies" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cinema-gold hover:text-white mb-6 transition-colors duration-300">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide">{movie.title}</h1>
        </div>
      </div>

      {/* Info Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
        {/* Left 2 Columns: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-wrap items-center gap-6 text-sm text-cinema-gray">
            <span className="flex items-center gap-1 text-cinema-gold font-extrabold text-base">
              <Star size={18} className="fill-cinema-gold" /> {movie.rating}/10
            </span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={16} /> {movie.duration}</span>
            <span>•</span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded text-white text-xs uppercase">{movie.language}</span>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-cinema-gold font-bold uppercase tracking-wider mb-3">Synopsis</h3>
            <p className="text-cinema-gray text-base leading-relaxed">{movie.synopsis}</p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-cinema-gold font-bold uppercase tracking-wider mb-3">Cast & Crew</h3>
            <p className="text-white font-medium text-base">{movie.cast}</p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-cinema-gold font-bold uppercase tracking-wider mb-3 font-semibold">Release Date</h3>
            <p className="text-cinema-gray text-base">{movie.releaseDate}</p>
          </div>
        </div>

        {/* Right 1 Column: Showtimes Card */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-28">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4 uppercase tracking-wider">
              Available Showtimes
            </h3>

            {movie.status !== 'Now Showing' ? (
              <div className="text-center py-6">
                <span className="text-2xl block mb-2">🗓️</span>
                <p className="text-cinema-gold font-bold text-sm uppercase tracking-wider">Coming Soon</p>
                <p className="text-cinema-gray text-xs mt-1">This movie is not showing yet. Stay tuned for show schedules!</p>
              </div>
            ) : showtimes.length === 0 ? (
              <p className="text-cinema-gray text-sm text-center py-6">No active showtimes scheduled for this movie today.</p>
            ) : (
              <div className="space-y-6">
                {Object.keys(showtimesByDate).map((date) => (
                  <div key={date} className="space-y-3">
                    <h4 className="text-xs font-bold text-cinema-gold uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar size={14} /> {new Date(date).toLocaleDateString('en-PK', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {showtimesByDate[date].map((st) => (
                        <Link
                          key={st.id}
                          to={`/book?movieId=${movie.id}&showtimeId=${st.id}`}
                          className="bg-white/5 hover:bg-cinema-red border border-white/10 hover:border-cinema-red rounded-xl p-3 text-center transition-all duration-300 group"
                        >
                          <span className="block font-bold text-white group-hover:text-white text-sm">{st.time}</span>
                          <span className="block text-[10px] text-cinema-gray group-hover:text-white/80 mt-0.5 truncate">{st.screen?.name.split('-')[1]?.trim() || st.screen?.name}</span>
                          <span className="block text-[10px] text-cinema-gold group-hover:text-white mt-1 font-semibold">PKR {st.price}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-white/5">
                  <Link
                    to={`/book?movieId=${movie.id}`}
                    className="block bg-cinema-red hover:bg-red-700 text-center py-3.5 rounded-xl text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 glow-red"
                  >
                    Select Seats & Book
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
