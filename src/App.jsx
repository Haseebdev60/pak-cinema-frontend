import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Customer Pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import BookTicket from './pages/BookTicket';
import Ticket from './pages/Ticket';
import FoodCourt from './pages/FoodCourt';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import CRUDPage from './pages/admin/CRUDPage';
import Analytics from './pages/admin/Analytics';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Portal Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/book" element={<BookTicket />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="/food-court" element={<FoodCourt />} />
        <Route path="/contact" element={<Contact />} />

        {/* Administrative Portal Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/:entityType" element={<CRUDPage />} />
      </Routes>
    </Router>
  );
}
