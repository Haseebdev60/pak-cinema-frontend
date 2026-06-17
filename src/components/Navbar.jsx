import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Film, Calendar, Coffee, PhoneCall, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: <Film size={18} /> },
    { name: 'Movies', path: '/movies', icon: <Film size={18} /> },
    { name: 'Food Court', path: '/food-court', icon: <Coffee size={18} /> },
    { name: 'Contact Us', path: '/contact', icon: <PhoneCall size={18} /> },
    { name: 'Admin Portal', path: '/admin/login', icon: <LayoutDashboard size={18} /> }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-wider flex items-center">
              <span className="text-cinema-red font-extrabold">CINE</span>
              <span className="text-cinema-gold font-bold">GOLD</span>
              <span className="text-white text-xs ml-1 bg-cinema-red px-1 rounded-sm uppercase tracking-widest font-semibold scale-75">PK</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-cinema-gold flex items-center gap-1 ${
                  isActive(link.path) ? 'text-cinema-gold border-b-2 border-cinema-gold pb-1' : 'text-white/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-cinema-red hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 glow-red"
            >
              Book Tickets
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none hover:text-cinema-gold transition-colors duration-300"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 bg-cinema-bg/95">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-white/5 text-cinema-gold border-l-4 border-cinema-gold'
                    : 'text-white/80 hover:bg-white/5 hover:text-cinema-gold'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="px-3 pt-4">
              <Link
                to="/book"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-cinema-red hover:bg-red-700 text-white py-3 rounded-full text-base font-semibold tracking-wider uppercase transition-all duration-300 glow-red"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
