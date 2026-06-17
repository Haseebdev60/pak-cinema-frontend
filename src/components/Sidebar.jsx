import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Film, Calendar, Monitor, Users, Ticket, 
  UserSquare2, Coffee, ShoppingBag, BarChart3, LogOut, ArrowLeft
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform simulated logout
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Movies', path: '/admin/movies', icon: <Film size={18} /> },
    { name: 'Showtimes', path: '/admin/showtimes', icon: <Calendar size={18} /> },
    { name: 'Screens', path: '/admin/screens', icon: <Monitor size={18} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={18} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <Ticket size={18} /> },
    { name: 'Tickets', path: '/admin/tickets', icon: <Ticket size={18} className="rotate-45" /> },
    { name: 'Employees', path: '/admin/employees', icon: <UserSquare2 size={18} /> },
    { name: 'Concessions', path: '/admin/concessions', icon: <Coffee size={18} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={18} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-cinema-card border-r border-white/5 flex flex-col fixed top-0 left-0 z-30">
      {/* Brand/Title */}
      <div className="h-20 flex items-center justify-center border-b border-white/5 px-6">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-black tracking-wider flex items-center">
            <span className="text-cinema-red font-extrabold">ADMIN</span>
            <span className="text-cinema-gold font-bold">PORTAL</span>
          </span>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-cinema-red text-white shadow-lg shadow-cinema-red/10'
                  : 'text-cinema-gray hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          to="/"
          className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium text-cinema-gray hover:bg-white/5 hover:text-white transition-all duration-200"
        >
          <ArrowLeft size={18} />
          <span>Exit to Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium text-cinema-red hover:bg-cinema-red/10 transition-all duration-200"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
