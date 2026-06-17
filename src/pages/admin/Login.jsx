import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate as useNav } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNav();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulated Authentication
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setLoading(false);
        navigate('/admin/dashboard');
      } else {
        setLoading(false);
        setError('Invalid admin credentials. Please use admin / admin123.');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-cinema-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Back Link */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-cinema-gray hover:text-white uppercase transition-colors">
            <ArrowLeft size={14} /> Back to Customer Site
          </Link>
        </div>

        {/* Card Panel */}
        <div className="glass-panel-gold p-8 rounded-3xl border border-cinema-gold/20 shadow-xl shadow-cinema-gold/2">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-2xl font-black tracking-wider flex items-center justify-center">
              <span className="text-cinema-red font-extrabold">ADMIN</span>
              <span className="text-cinema-gold font-bold">PORTAL</span>
            </span>
            <p className="text-cinema-gray text-xs mt-2 uppercase tracking-widest font-semibold">
              Cinema Management System Login
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-950/80 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-cinema-gold uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-cinema-gray" size={16} />
                <input
                  type="text"
                  required
                  placeholder="Enter administrator username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-cinema-bg border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cinema-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-cinema-gold uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-cinema-gray" size={16} />
                <input
                  type="password"
                  required
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cinema-bg border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cinema-gold"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cinema-red hover:bg-red-700 text-white font-bold py-3 rounded-xl tracking-wider uppercase transition-all duration-300 text-xs flex items-center justify-center gap-1.5 glow-red"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Info details */}
          <div className="mt-6 text-center text-[10px] text-cinema-gray leading-relaxed border-t border-white/5 pt-4">
            <p>University DB project mode active.</p>
            <p className="mt-0.5">Use <strong className="text-white font-semibold">admin / admin123</strong> to login.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
