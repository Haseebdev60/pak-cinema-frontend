import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, Download, ArrowLeft, Ticket as TicketIcon, Calendar, Clock, Monitor } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bookingService from '../services/bookingService';

export default function Ticket() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await bookingService.getBookingById(id);
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-bg flex items-center justify-center text-white">
        Loading ticket details...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-cinema-bg flex flex-col pt-20">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ticket Not Found</h2>
          <p className="text-cinema-gray text-sm mb-4">The specified booking identifier does not exist in the database.</p>
          <Link to="/" className="text-cinema-gold hover:underline">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Combine seat numbers
  const seatNumbers = booking.tickets.map(t => t.seatNumber).join(', ');

  return (
    <div className="min-h-screen flex flex-col bg-cinema-bg pt-20 print:bg-white print:pt-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full flex flex-col items-center">
        {/* Navigation back and Print Controls */}
        <div className="w-full flex justify-between items-center mb-8 print:hidden">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cinema-gold hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Printer size={14} /> Print
            </button>
            <button
              onClick={handlePrint}
              className="bg-cinema-gold hover:bg-yellow-600 text-cinema-bg rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 glow-gold"
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>

        {/* Digital Ticket Card */}
        <div className="w-full bg-cinema-card border border-cinema-gold/30 rounded-3xl overflow-hidden shadow-2xl shadow-cinema-gold/5 flex flex-col relative print:border-black print:text-black print:bg-white">
          {/* Header Ticket Section */}
          <div className="p-8 border-b-2 border-dashed border-white/10 relative print:border-black">
            {/* Ticket Tear Notch Left */}
            <div className="w-6 h-6 bg-cinema-bg rounded-full absolute -bottom-3 -left-3 border-r border-cinema-gold/30 print:bg-white print:border-black"></div>
            {/* Ticket Tear Notch Right */}
            <div className="w-6 h-6 bg-cinema-bg rounded-full absolute -bottom-3 -right-3 border-l border-cinema-gold/30 print:bg-white print:border-black"></div>

            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] text-cinema-gold font-extrabold uppercase tracking-widest print:text-black">
                  CineGold Cinemas Pakistan
                </span>
                <h2 className="text-2xl font-black text-white mt-1 uppercase tracking-wide print:text-black">
                  {booking.movie?.title}
                </h2>
                <span className="bg-white/10 px-2 py-0.5 rounded text-white text-[10px] uppercase font-bold mt-2 inline-block print:border print:border-black print:text-black">
                  {booking.movie?.language}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-cinema-gray uppercase font-bold tracking-wider block print:text-black">
                  Ticket ID
                </span>
                <span className="text-white font-extrabold text-sm block tracking-widest mt-0.5 print:text-black">
                  {booking.tickets[0]?.id || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Details Body Section */}
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            {/* Info Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-cinema-gray uppercase font-bold tracking-wider block print:text-black">
                    Show Date
                  </span>
                  <span className="text-white font-bold text-sm flex items-center gap-1.5 mt-1 print:text-black">
                    <Calendar size={14} className="text-cinema-gold print:text-black" />
                    {new Date(booking.showtime?.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-cinema-gray uppercase font-bold tracking-wider block print:text-black">
                    Showtime
                  </span>
                  <span className="text-white font-bold text-sm flex items-center gap-1.5 mt-1 print:text-black">
                    <Clock size={14} className="text-cinema-gold print:text-black" />
                    {booking.showtime?.time} (PKT)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-cinema-gray uppercase font-bold tracking-wider block print:text-black">
                    Hall & Screen
                  </span>
                  <span className="text-white font-bold text-sm flex items-center gap-1.5 mt-1 print:text-black">
                    <Monitor size={14} className="text-cinema-gold print:text-black" />
                    {booking.screen?.name.split('-')[1]?.trim() || booking.screen?.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-cinema-gray uppercase font-bold tracking-wider block print:text-black">
                    Seats
                  </span>
                  <span className="text-cinema-gold font-extrabold text-sm block mt-1 print:text-black">
                    {seatNumbers}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-cinema-gray uppercase font-bold tracking-wider block print:text-black">
                    Customer Name
                  </span>
                  <span className="text-white font-bold text-xs block mt-1 print:text-black">
                    {booking.customer?.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-cinema-gray uppercase font-bold tracking-wider block print:text-black">
                    Price Total
                  </span>
                  <span className="text-white font-black text-sm block mt-1 print:text-black">
                    PKR {booking.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Live QR Code Box */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="w-36 h-36 bg-white p-3 rounded-2xl border-4 border-cinema-gold/30 flex items-center justify-center shadow-lg print:border-black">
                {/* Visual QR Grid Simulation */}
                <div className="grid grid-cols-6 gap-1 w-full h-full text-black opacity-90">
                  {Array.from({ length: 36 }).map((_, i) => {
                    const filled = (i * 7 + 13) % 5 === 0 || (i * 3 + 2) % 4 === 0 || i < 6 || i % 6 === 0 || i > 30 || i % 6 === 5;
                    return (
                      <div
                        key={i}
                        className={`rounded-sm ${filled ? 'bg-black' : 'bg-transparent'}`}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <span className="text-[9px] text-cinema-gray uppercase tracking-widest mt-3 font-semibold print:text-black">
                SCAN AT HALL ENTRANCE
              </span>
            </div>
          </div>

          {/* Booking Metadata Bar */}
          <div className="bg-white/5 px-8 py-4 flex justify-between items-center text-xs text-cinema-gray print:bg-white print:border-t print:border-black print:text-black">
            <span>Booking ID: <strong className="text-white print:text-black">{booking.id}</strong></span>
            <span>Platform: <strong className="text-cinema-gold print:text-black">CineGold Web App</strong></span>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
