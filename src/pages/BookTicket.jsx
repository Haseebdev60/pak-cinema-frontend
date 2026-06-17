import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Monitor, User, Phone, Mail, FileText, ShoppingCart, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieImage from '../components/MovieImage';
import movieService from '../services/movieService';
import bookingService from '../services/bookingService';
import concessionService from '../services/concessionService';

export default function BookTicket() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Step indicator: 1: Movie, 2: Date, 3: Showtime & Screen, 4: Seats, 5: Customer Form, 6: Concessions, 7: Summary, 8: Confirm
  const [step, setStep] = useState(1);

  // Lists
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [concessions, setConcessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // User Selections
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Customer Fields
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custCnic, setCustCnic] = useState('');
  const [custEmail, setCustEmail] = useState('');
  
  // Concession Selections
  const [foodQuantities, setFoodQuantities] = useState({}); // { id: qty }

  useEffect(() => {
    const loadInitData = async () => {
      try {
        const mList = await movieService.getMovies();
        const sList = await bookingService.getShowtimes();
        const cList = await concessionService.getConcessions();
        
        const nowShowingMovies = mList.filter(m => m.status === 'Now Showing');
        setMovies(nowShowingMovies);
        setShowtimes(sList);
        setConcessions(cList);

        // Check query parameters
        const qMovieId = searchParams.get('movieId');
        const qShowtimeId = searchParams.get('showtimeId');

        if (qShowtimeId) {
          const st = sList.find(s => s.id === qShowtimeId);
          if (st) {
            setSelectedMovie(mList.find(m => m.id === st.movieId));
            setSelectedDate(st.date);
            setSelectedShowtime(st);
            setStep(4); // Skip to Seat Selection directly!
          }
        } else if (qMovieId) {
          const mv = nowShowingMovies.find(m => m.id === qMovieId);
          if (mv) {
            setSelectedMovie(mv);
            setStep(2);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadInitData();
  }, [searchParams]);

  // Derived variables
  const availableDates = selectedMovie
    ? [...new Set(showtimes.filter(s => s.movieId === selectedMovie.id).map(s => s.date))]
    : [];

  const availableShowtimes = selectedMovie && selectedDate
    ? showtimes.filter(s => s.movieId === selectedMovie.id && s.date === selectedDate)
    : [];

  // Generate seat grid
  const renderSeatGrid = () => {
    if (!selectedShowtime || !selectedShowtime.screen) return null;
    const { rows, cols, seatsBooked } = selectedShowtime.screen;
    
    // Build rows (A, B, C...)
    const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));
    const colLabels = Array.from({ length: cols }, (_, i) => i + 1);

    const toggleSeat = (seatLabel) => {
      // Check if already booked in simulated db
      const isBooked = selectedShowtime.seatsBooked.includes(seatLabel);
      if (isBooked) return;

      if (selectedSeats.includes(seatLabel)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seatLabel));
      } else {
        setSelectedSeats([...selectedSeats, seatLabel]);
      }
    };

    return (
      <div className="flex flex-col items-center py-6 overflow-x-auto w-full">
        {/* Cinema Screen Curve */}
        <div className="w-[80%] max-w-lg h-3 border-t-4 border-cinema-gold/40 rounded-[50%] mb-12 relative text-center">
          <span className="text-[10px] text-cinema-gold/60 absolute top-3 left-1/2 -translate-x-1/2 uppercase tracking-widest font-semibold">
            SCREEN THIS WAY
          </span>
        </div>

        {/* Grid */}
        <div className="grid gap-2 select-none min-w-[320px]">
          {rowLabels.map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-xs text-cinema-gray font-bold text-center">{row}</span>
              <div className="flex gap-2">
                {colLabels.map((col) => {
                  const label = `${row}-${col}`;
                  const isBooked = selectedShowtime.seatsBooked.includes(label);
                  const isSelected = selectedSeats.includes(label);
                  
                  return (
                    <button
                      key={col}
                      onClick={() => toggleSeat(label)}
                      disabled={isBooked}
                      className={`w-8 h-8 rounded text-[10px] font-bold flex items-center justify-center transition-all duration-200 ${
                        isBooked
                          ? 'bg-red-950 text-red-500/50 border border-red-900/50 cursor-not-allowed'
                          : isSelected
                          ? 'bg-cinema-gold text-cinema-bg font-extrabold shadow-md shadow-cinema-gold/20'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-cinema-gray">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-white/5 border border-white/10 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-cinema-gold rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-red-950 border border-red-900 rounded"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    );
  };

  // Concessions ordering
  const handleFoodQty = (id, delta) => {
    setFoodQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Compute Concession total
  const getConcessionTotal = () => {
    return Object.keys(foodQuantities).reduce((sum, id) => {
      const item = concessions.find(c => c.id === id);
      const qty = foodQuantities[id];
      if (item && qty) {
        return sum + (item.price * qty);
      }
      return sum;
    }, 0);
  };

  const getTicketsTotal = () => {
    return selectedShowtime ? selectedShowtime.price * selectedSeats.length : 0;
  };

  // Process Booking Create
  const handleBookingConfirm = async () => {
    try {
      const orderedConcessions = Object.keys(foodQuantities)
        .filter(id => foodQuantities[id] > 0)
        .map(id => ({
          concessionId: id,
          quantity: foodQuantities[id]
        }));

      const payload = {
        customer: {
          name: custName,
          phone: custPhone,
          cnic: custCnic,
          email: custEmail
        },
        showtimeId: selectedShowtime.id,
        seats: selectedSeats,
        ticketType: selectedShowtime.screen.type,
        concessionsOrdered: orderedConcessions
      };

      const result = await bookingService.createBooking(payload);
      
      // Successfully booked, let's go to step 8 success screen and save booking ID
      setStep(8);
      // Wait 2 seconds then navigate to digital ticket page
      setTimeout(() => {
        navigate(`/ticket/${result.booking.id}`);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-bg flex items-center justify-center text-white">
        Loading booking portal...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cinema-bg pt-20">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Step Indicator Header */}
        {step < 8 && (
          <div className="mb-10">
            <div className="flex justify-between items-center text-xs text-cinema-gray font-bold tracking-wider uppercase mb-3">
              <span>Booking Progress</span>
              <span className="text-cinema-gold">Step {step} of 7</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-cinema-red h-full transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* STAGES OF WIZARD */}

        {/* STEP 1: Select Movie */}
        {step === 1 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="text-cinema-gold">01.</span> Select Movie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {movies.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMovie(m);
                    setStep(2);
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex gap-4 text-left transition-colors duration-300"
                >
                  <MovieImage src={m.poster} alt={m.title} type="poster" className="w-16 h-20 object-cover rounded-lg shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-base">{m.title}</h3>
                    <p className="text-xs text-cinema-gold mt-1">{m.genre}</p>
                    <p className="text-[10px] text-cinema-gray mt-2">{m.duration} • {m.language}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Select Date */}
        {step === 2 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-xs text-cinema-gray hover:text-white uppercase mb-6">
              <ArrowLeft size={14} /> Back
            </button>
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="text-cinema-gold">02.</span> Choose Date
            </h2>
            {availableDates.length === 0 ? (
              <p className="text-cinema-gray text-center py-6">No scheduled show dates for this movie currently.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setStep(3);
                    }}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-center transition-colors duration-300"
                  >
                    <Calendar className="mx-auto text-cinema-gold mb-2" size={24} />
                    <span className="block font-bold text-white text-sm">
                      {new Date(date).toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Select Showtime & Screen */}
        {step === 3 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-1 text-xs text-cinema-gray hover:text-white uppercase mb-6">
              <ArrowLeft size={14} /> Back
            </button>
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="text-cinema-gold">03.</span> Choose Showtime & Screen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableShowtimes.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedShowtime(st);
                    setStep(4);
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 flex justify-between items-center transition-colors duration-300"
                >
                  <div>
                    <span className="block font-bold text-white text-lg flex items-center gap-1.5">
                      <Clock size={16} className="text-cinema-gold" /> {st.time}
                    </span>
                    <span className="block text-xs text-cinema-gray font-semibold mt-1 uppercase tracking-wider">
                      {st.screen?.name}
                    </span>
                    <span className="block text-[10px] text-cinema-gold mt-0.5">
                      {st.screen?.type} Screen Format
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-white text-sm">PKR {st.price}</span>
                    <span className="text-[10px] text-cinema-gray">Per Seat</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Seat Selection Layout */}
        {step === 4 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <button
              onClick={() => {
                // If deep-linked directly via query params, exit to movies
                const qShowtimeId = searchParams.get('showtimeId');
                if (qShowtimeId) {
                  navigate(`/movies/${selectedMovie.id}`);
                } else {
                  setStep(3);
                }
              }}
              className="inline-flex items-center gap-1 text-xs text-cinema-gray hover:text-white uppercase mb-6"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
              <span className="text-cinema-gold">04.</span> Select Seats
            </h2>
            <p className="text-cinema-gray text-xs mb-6">Choose one or more seats below. Double click to release selection.</p>

            {renderSeatGrid()}

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
              <div className="text-center sm:text-left">
                <span className="block text-xs text-cinema-gray font-medium uppercase tracking-wider">Seats Selected</span>
                <span className="block font-bold text-white text-lg mt-0.5">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </span>
              </div>
              <button
                disabled={selectedSeats.length === 0}
                onClick={() => setStep(5)}
                className="w-full sm:w-auto bg-cinema-red disabled:bg-white/5 disabled:text-cinema-gray/50 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl tracking-wider uppercase transition-all duration-300 text-sm flex items-center justify-center gap-1.5"
              >
                Proceed to Info <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Customer Information Form */}
        {step === 5 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <button onClick={() => setStep(4)} className="inline-flex items-center gap-1 text-xs text-cinema-gray hover:text-white uppercase mb-6">
              <ArrowLeft size={14} /> Back
            </button>
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="text-cinema-gold">05.</span> Customer Information
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); setStep(6); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Customer Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-cinema-gray" size={16} />
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-cinema-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cinema-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-cinema-gray" size={16} />
                  <input
                    type="tel"
                    required
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="e.g. 03001234567"
                    className="w-full bg-cinema-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cinema-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">CNIC (National ID)</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 text-cinema-gray" size={16} />
                  <input
                    type="text"
                    required
                    value={custCnic}
                    onChange={(e) => setCustCnic(e.target.value)}
                    placeholder="e.g. 35201-1234567-1"
                    className="w-full bg-cinema-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cinema-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-cinema-gray" size={16} />
                  <input
                    type="email"
                    required
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    placeholder="e.g. customer@domain.com"
                    className="w-full bg-cinema-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cinema-gold"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-cinema-red hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl tracking-wider uppercase transition-all duration-300 text-sm flex items-center gap-1.5"
                >
                  Proceed to Snacks <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 6: Concessions / Food */}
        {step === 6 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <button onClick={() => setStep(5)} className="inline-flex items-center gap-1 text-xs text-cinema-gray hover:text-white uppercase mb-6">
              <ArrowLeft size={14} /> Back
            </button>
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
              <span className="text-cinema-gold">06.</span> Concessions Food Add-on
            </h2>
            <p className="text-cinema-gray text-xs mb-6">Add delicious munchies to enjoy during your movie. Collection at counter.</p>

            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
              {concessions.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                    <p className="text-xs text-cinema-gold mt-0.5">PKR {item.price}</p>
                    <p className="text-[10px] text-cinema-gray mt-1">Stock status: {item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleFoodQty(item.id, -1)}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="w-4 text-center text-sm font-bold text-white">{foodQuantities[item.id] || 0}</span>
                    <button
                      onClick={() => handleFoodQty(item.id, 1)}
                      disabled={item.stock <= (foodQuantities[item.id] || 0)}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/10 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
              <div className="text-center sm:text-left">
                <span className="block text-xs text-cinema-gray font-medium uppercase tracking-wider">Concessions Bill</span>
                <span className="block font-bold text-cinema-gold text-lg mt-0.5">
                  PKR {getConcessionTotal()}
                </span>
              </div>
              <button
                onClick={() => setStep(7)}
                className="w-full sm:w-auto bg-cinema-red hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl tracking-wider uppercase transition-all duration-300 text-sm flex items-center justify-center gap-1.5"
              >
                Booking Summary <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Booking Summary */}
        {step === 7 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <button onClick={() => setStep(6)} className="inline-flex items-center gap-1 text-xs text-cinema-gray hover:text-white uppercase mb-6">
              <ArrowLeft size={14} /> Back
            </button>
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="text-cinema-gold">07.</span> Booking Summary
            </h2>

            {/* Summary Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Movie Details</h4>
                  <p className="text-white font-bold text-lg">{selectedMovie?.title}</p>
                  <p className="text-xs text-cinema-gray mt-1">{selectedMovie?.language} • {selectedMovie?.duration}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Showtime & Screen</h4>
                  <p className="text-white font-bold text-base flex items-center gap-1">
                    <Clock size={16} className="text-cinema-gold" /> {selectedShowtime?.time} (PKT)
                  </p>
                  <p className="text-xs text-cinema-gray mt-1 font-semibold uppercase tracking-wide">
                    {selectedShowtime?.screen?.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Seats booked</h4>
                  <p className="text-white font-bold text-base">{selectedSeats.join(', ')}</p>
                  <p className="text-xs text-cinema-gray mt-1">{selectedSeats.length} Ticket(s)</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Customer Details</h4>
                  <p className="text-white font-bold text-sm">{custName}</p>
                  <p className="text-xs text-cinema-gray mt-1">{custPhone} • CNIC: {custCnic}</p>
                </div>
              </div>

              {/* Snacks Summary */}
              {getConcessionTotal() > 0 && (
                <div className="pb-6 border-b border-white/5">
                  <h4 className="text-xs font-bold text-cinema-gold uppercase tracking-wider mb-3">Concessions Add-ons</h4>
                  <div className="space-y-1.5 text-xs text-cinema-gray">
                    {Object.keys(foodQuantities).map(id => {
                      const item = concessions.find(c => c.id === id);
                      const qty = foodQuantities[id];
                      if (item && qty > 0) {
                        return (
                          <div key={id} className="flex justify-between">
                            <span>{item.name} x {qty}</span>
                            <span>PKR {item.price * qty}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* Total Calculation */}
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                <div>
                  <span className="block text-xs text-cinema-gray font-bold uppercase tracking-wider">Total Payable (PKR)</span>
                  <span className="text-[10px] text-cinema-gray">Tickets: PKR {getTicketsTotal()} {getConcessionTotal() > 0 ? `+ Snacks: PKR ${getConcessionTotal()}` : ''}</span>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-cinema-gold">
                    PKR {getTicketsTotal() + getConcessionTotal()}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleBookingConfirm}
                  className="w-full bg-cinema-red hover:bg-red-700 text-white font-bold py-4 rounded-xl tracking-wider uppercase transition-all duration-300 text-sm flex items-center justify-center gap-2 glow-red"
                >
                  <CheckCircle size={18} /> Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Success State (Booking Confirmed) */}
        {step === 8 && (
          <div className="glass-panel p-8 rounded-3xl border border-cinema-gold/30 text-center py-16 space-y-6">
            <div className="w-20 h-20 bg-cinema-gold/10 border border-cinema-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 text-cinema-gold animate-bounce">
              <CheckCircle size={44} />
            </div>
            
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider">
              Booking Confirmed!
            </h2>
            <p className="text-cinema-gray max-w-md mx-auto text-sm">
              Your seats have been booked in our database tables (Customers, Bookings, Tickets). We are generating your printable digital ticket card. Please wait...
            </p>
            <div className="w-10 h-10 border-4 border-cinema-gold border-t-transparent rounded-full animate-spin mx-auto mt-6"></div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
