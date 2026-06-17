import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cinema-card border-t border-white/5 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <span className="text-2xl font-black tracking-wider flex items-center mb-4">
              <span className="text-cinema-red font-extrabold">CINE</span>
              <span className="text-cinema-gold font-bold">GOLD</span>
              <span className="text-white text-xs ml-1 bg-cinema-red px-1 rounded-sm uppercase tracking-widest font-semibold scale-75">PK</span>
            </span>
            <p className="text-cinema-gray text-sm leading-relaxed mb-4">
              Pakistan's premium state-of-the-art cinema experience. Enjoy standard, IMAX, VIP, and 4DX formats with crystal clear digital projections.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cinema-gray hover:text-cinema-red transition-colors duration-300" title="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-5 1.55-5 4.5V8z"/>
                </svg>
              </a>
              <a href="#" className="text-cinema-gray hover:text-cinema-gold transition-colors duration-300" title="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-cinema-gray hover:text-cinema-red transition-colors duration-300" title="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide border-l-4 border-cinema-red pl-2">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-cinema-gray">
              <li>
                <Link to="/" className="hover:text-cinema-gold transition-colors duration-300">Home Page</Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-cinema-gold transition-colors duration-300">Now Showing</Link>
              </li>
              <li>
                <Link to="/food-court" className="hover:text-cinema-gold transition-colors duration-300">Food Court Items</Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-cinema-gold transition-colors duration-300">Book Tickets</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cinema-gold transition-colors duration-300">Contact & Locations</Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide border-l-4 border-cinema-gold pl-2">Our Branches</h4>
            <ul className="space-y-2.5 text-sm text-cinema-gray">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-cinema-red mt-0.5 shrink-0" />
                <span>Centaurus Mall, Sector F-8, Islamabad</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-cinema-gold mt-0.5 shrink-0" />
                <span>Packages Mall, Walton Road, Lahore</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-cinema-red mt-0.5 shrink-0" />
                <span>Ocean Mall, Clifton, Karachi</span>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide border-l-4 border-cinema-red pl-2">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-cinema-gray">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-cinema-gold shrink-0" />
                <span>UAN: +92 (51) 111-246-372 (CINE)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-cinema-red shrink-0" />
                <span>info@cinegold.com.pk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-cinema-gray">
          <p>© {new Date().getFullYear()} CineGold Cinemas Pakistan. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 font-medium tracking-wide">
            DBMS Semester Project - React & SQL Server via PHP APIs
          </p>
        </div>
      </div>
    </footer>
  );
}
