import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Star, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieImage from '../components/MovieImage';
import movieService from '../services/movieService';
import bookingService from '../services/bookingService';

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mList = await movieService.getMovies();
        setMovies(mList);
        const sList = await bookingService.getShowtimes();
        setShowtimes(sList.slice(0, 4)); // Show first 4 schedules
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nowShowing = movies.filter(m => m.status === 'Now Showing');
  const comingSoon = movies.filter(m => m.status === 'Coming Soon');

  // Featured Movie
  const featured = nowShowing[0] || {};

  const premiumExperiences = [
    { name: 'Standard Hall', desc: 'Sleek, comfortable seating with advanced 7.1 surround sound.', badge: 'Standard' },
    { name: 'Premium Hall', desc: 'Plush leather recliners, extra legroom, and premium laser projection.', badge: 'Premium' },
    { name: 'VIP Lounge', desc: 'Exclusive in-theatre dining service, ultra-luxurious fully reclining sofas.', badge: 'VIP Exclusive' },
    { name: 'IMAX Experience', desc: 'Dazzling dual projection, towering screens, and immersive pin-drop audio.', badge: 'Immersive IMAX' },
    { name: '4DX Experience', desc: 'Motion-synchronized seats with ambient wind, water, scent, and light effects.', badge: 'Sensory 4DX' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cinema-bg pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center overflow-hidden">
        {/* Background Image / Banner */}
        <div className="absolute inset-0 z-0">
          <MovieImage 
            src={featured.banner} 
            alt={featured.title} 
            type="banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-bg via-cinema-bg/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-transparent to-transparent z-10"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl md:max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/20 text-cinema-gold text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={12} />
              <span>Featured Movie</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4">
              {featured.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-cinema-gray mb-6">
              <span className="flex items-center gap-1 text-cinema-gold font-bold">
                <Star size={16} className="fill-cinema-gold" /> {featured.rating}/10
              </span>
              <span>•</span>
              <span>{featured.duration}</span>
              <span>•</span>
              <span>{featured.genre}</span>
              <span>•</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-white text-xs uppercase">{featured.language}</span>
            </div>

            <p className="text-cinema-gray text-base sm:text-lg mb-8 leading-relaxed line-clamp-3">
              {featured.synopsis}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={`/book?movieId=${featured.id}`}
                className="bg-cinema-red hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full tracking-wider uppercase transition-all duration-300 glow-red text-sm"
              >
                Book Tickets Now
              </Link>
              <Link
                to={`/movies/${featured.id}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-full tracking-wider uppercase transition-all duration-300 text-sm"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Promotion Card */}
        <div className="absolute right-8 bottom-8 hidden lg:block z-20 max-w-sm">
          <div className="glass-panel-gold p-6 rounded-2xl border border-cinema-gold/20">
            <h4 className="text-cinema-gold font-bold text-lg mb-2">WEEKLY SPECIAL OFFER</h4>
            <p className="text-cinema-gray text-sm leading-relaxed mb-4">
              Get <span className="text-white font-semibold">20% Discount</span> on tickets and food court combos using your HBL card. Valid till June 15!
            </p>
            <span className="text-xs text-white/50">*Terms and conditions apply</span>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">NOW SHOWING</h2>
            <div className="w-16 h-1 bg-cinema-red mt-2"></div>
          </div>
          <Link to="/movies" className="text-cinema-gold hover:text-white flex items-center gap-1 text-sm font-semibold tracking-wider uppercase transition-colors duration-300">
            View All Movies <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10 text-cinema-gray">Loading showtimes...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {nowShowing.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ y: -10 }}
                className="bg-cinema-card rounded-2xl overflow-hidden border border-white/5 flex flex-col group h-full"
              >
                <div className="relative poster-aspect overflow-hidden">
                  <MovieImage
                    src={movie.poster}
                    alt={movie.title}
                    type="poster"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-cinema-bg/80 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 text-xs text-cinema-gold font-bold border border-cinema-gold/20">
                    <Star size={12} className="fill-cinema-gold" /> {movie.rating}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs text-cinema-gold font-medium mb-1 uppercase tracking-widest">{(movie.Genre || movie.genre || '').split(',')[0]}</span>
                  <h3 className="font-bold text-white text-lg mb-2 line-clamp-1 group-hover:text-cinema-red transition-colors duration-300">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-cinema-gray mb-6">
                    <span className="flex items-center gap-1"><Clock size={12} /> {movie.duration}</span>
                    <span>•</span>
                    <span>{movie.language}</span>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <Link
                      to={`/movies/${movie.id}`}
                      className="bg-white/5 hover:bg-white/10 text-center py-2.5 rounded-lg text-xs font-semibold transition-colors duration-300 border border-white/10"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/book?movieId=${movie.id}`}
                      className="bg-cinema-red hover:bg-red-700 text-center py-2.5 rounded-lg text-xs font-semibold text-white transition-all duration-300 glow-red"
                    >
                      Book Ticket
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Today's Showtimes */}
      <section className="py-20 bg-cinema-card border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">TODAY'S SCHEDULE</h2>
            <p className="text-cinema-gray text-sm mt-2">Catch the latest screens running live in Karachi, Lahore, and Islamabad</p>
            <div className="w-16 h-1 bg-cinema-gold mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showtimes.map((st) => (
              <div key={st.id} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-4 items-center">
                  <MovieImage 
                    src={st.movie?.poster} 
                    alt={st.movie?.title} 
                    type="poster" 
                    className="w-16 h-20 object-cover rounded-lg shrink-0 border border-white/10" 
                  />
                  <div>
                    <h3 className="font-bold text-white text-lg">{st.movie?.title}</h3>
                    <p className="text-xs text-cinema-gold font-medium mt-1 uppercase tracking-wider">{st.screen?.name}</p>
                    <div className="flex items-center gap-4 text-xs text-cinema-gray mt-2">
                      <span className="flex items-center gap-1"><Clock size={12} /> {st.time} (PKT)</span>
                      <span>•</span>
                      <span>PKR {st.price}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/book?showtimeId=${st.id}`}
                  className="w-full sm:w-auto bg-cinema-red hover:bg-red-700 text-center px-6 py-2.5 rounded-lg text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 shrink-0"
                >
                  Quick Book
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Experiences */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Premium Experiences</h2>
          <div className="w-16 h-1 bg-cinema-red mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {premiumExperiences.map((exp, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cinema-gold/30 transition-all duration-300 flex flex-col text-center"
            >
              <div className="bg-cinema-gold/10 text-cinema-gold px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4 self-center">
                {exp.badge}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{exp.name}</h3>
              <p className="text-cinema-gray text-xs leading-relaxed mt-2">{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Food Court Preview */}
      <section className="py-20 bg-cinema-card border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/20 text-cinema-gold text-xs font-semibold uppercase tracking-wider mb-4">
              <ShoppingBag size={12} />
              <span>Concession Counter</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              CRAVING A SNACK? VISIT OUR FOOD COURT!
            </h2>
            <p className="text-cinema-gray text-base leading-relaxed mb-6">
              Complete your movie screening experience with our range of delicious movie munchies. From classic salted and caramel popcorn buckets to hot burgers, pizzas, and chilling soft drinks, we have it all. Order directly online or collect at the concessions counter.
            </p>
            <Link
              to="/food-court"
              className="bg-cinema-gold hover:bg-yellow-600 text-cinema-bg font-bold px-8 py-3.5 rounded-full tracking-wider uppercase transition-all duration-300 glow-gold inline-flex items-center gap-2 text-sm"
            >
              View Food Menu <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 shrink-0 w-full max-w-md">
            <div className="glass-panel p-4 rounded-2xl flex flex-col text-center items-center">
              <span className="text-4xl">🍿</span>
              <h4 className="font-bold text-white text-sm mt-3">Caramel Popcorn</h4>
              <span className="text-cinema-gold text-xs font-semibold mt-1">PKR 750</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl flex flex-col text-center items-center">
              <span className="text-4xl">🍔</span>
              <h4 className="font-bold text-white text-sm mt-3">Chicken Burger</h4>
              <span className="text-cinema-gold text-xs font-semibold mt-1">PKR 650</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl flex flex-col text-center items-center">
              <span className="text-4xl">🥤</span>
              <h4 className="font-bold text-white text-sm mt-3">Soft Drink</h4>
              <span className="text-cinema-gold text-xs font-semibold mt-1">PKR 250</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl flex flex-col text-center items-center">
              <span className="text-4xl">🍟</span>
              <h4 className="font-bold text-white text-sm mt-3">Masala Fries</h4>
              <span className="text-cinema-gold text-xs font-semibold mt-1">PKR 300</span>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">WHAT OUR CUSTOMERS SAY</h2>
          <div className="w-16 h-1 bg-cinema-gold mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative">
            <div className="flex items-center gap-1 text-cinema-gold mb-4">
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
            </div>
            <p className="text-cinema-gray text-sm leading-relaxed mb-6 italic">
              "The IMAX screen at packages mall Lahore is hands down the best cinema experience in Pakistan. Watching Maula Jatt here was epic. Extremely comfortable recliners!"
            </p>
            <h5 className="text-white font-bold text-sm">— Hamza Siddiqui (Lahore)</h5>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative">
            <div className="flex items-center gap-1 text-cinema-gold mb-4">
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
            </div>
            <p className="text-cinema-gray text-sm leading-relaxed mb-6 italic">
              "Booking was seamless. Got my digital ticket instantly on my phone. The seat selection layout is so realistic. Centaurus Cineplex is highly recommended!"
            </p>
            <h5 className="text-white font-bold text-sm">— Ayesha Noor (Islamabad)</h5>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative">
            <div className="flex items-center gap-1 text-cinema-gold mb-4">
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
              <Star size={16} className="fill-cinema-gold" />
            </div>
            <p className="text-cinema-gray text-sm leading-relaxed mb-6 italic">
              "Love the VIP experience! The food is served right at your seat. Caramel Popcorn is amazing. Best cinema staff in Clifton, Karachi."
            </p>
            <h5 className="text-white font-bold text-sm">— Mustafa Shah (Karachi)</h5>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-cinema-card border-t border-white/5 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">COMING SOON</h2>
            <div className="w-16 h-1 bg-cinema-red mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {comingSoon.map((movie) => (
              <div key={movie.id} className="bg-cinema-bg rounded-2xl overflow-hidden border border-white/5 flex flex-col group h-full">
                <div className="relative poster-aspect overflow-hidden">
                  <MovieImage
                    src={movie.poster}
                    alt={movie.title}
                    type="poster"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 bg-cinema-gold/95 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-cinema-bg font-extrabold border border-cinema-gold/20 uppercase tracking-wider">
                    Coming Soon
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs text-cinema-gold font-medium mb-1 uppercase tracking-widest">{(movie.Genre || movie.genre || '').split(',')[0]}</span>
                  <h3 className="font-bold text-white text-lg mb-2 line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-cinema-gray mt-auto">
                    <span>Release: {movie.releaseDate}</span>
                    <span>•</span>
                    <span>{movie.language}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
