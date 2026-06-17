import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { BarChart3, TrendingUp, Calendar, Clock, DollarSign } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';

export default function Analytics() {
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await adminService.getAnalyticsData();
        setCharts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-bg flex items-center justify-center text-white">
        Generating database analytics...
      </div>
    );
  }

  // Color Palette for Pie Chart slices
  const COLORS = ['#FFD700', '#E50914', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-cinema-bg flex">
      <Sidebar />

      {/* Main Workspace */}
      <main className="flex-1 ml-64 p-8 min-h-screen space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-wider">Operational Analytics</h1>
            <p className="text-cinema-gray text-xs mt-1 uppercase tracking-widest font-semibold">
              Advanced Database Statistics & Demand Forecasts
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-cinema-gold/10 border border-cinema-gold/20 px-4 py-2 rounded-xl text-xs text-cinema-gold font-bold">
            <TrendingUp size={14} />
            <span>Real-time DB Sync Active</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CHART 1: Revenue Streams */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-cinema-gold uppercase tracking-wider mb-6 flex items-center gap-2">
              <DollarSign size={16} /> Revenue Streams breakdown
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts?.revenueData || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" stroke="#666" fontSize={11} />
                  <YAxis stroke="#666" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }} />
                  <Legend wrapperStyle={{ fontSize: 11, pt: 10 }} />
                  <Bar name="Tickets (PKR)" dataKey="Tickets" fill="#E50914" radius={[4, 4, 0, 0]} />
                  <Bar name="Concessions (PKR)" dataKey="Concessions" fill="#FFD700" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART 2: Most Watched Movies */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-cinema-gold uppercase tracking-wider mb-6 flex items-center gap-2">
              <BarChart3 size={16} /> Most Watched Movies (Seat Booking Count)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts?.moviePopularity || []} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis type="number" stroke="#666" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="#666" fontSize={10} width={90} tickFormatter={(value) => value.slice(0, 11) + '.'} />
                  <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }} />
                  <Bar name="Tickets Booked" dataKey="Tickets" fill="#FFD700" radius={[0, 4, 4, 0]}>
                    {(charts?.moviePopularity || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART 3: Popular Showtimes */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-cinema-gold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Clock size={16} /> Showtime Capacity Load Factor
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts?.showtimeAnalytics || []} margin={{ top: 10, right: 20, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="time" stroke="#666" fontSize={11} />
                  <YAxis stroke="#666" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }} />
                  <Legend wrapperStyle={{ fontSize: 11, pt: 10 }} />
                  <Line name="Avg Seat Occupancy" type="monotone" dataKey="Bookings" stroke="#E50914" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART 4: Food Court Sales Breakdown */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-cinema-gold uppercase tracking-wider mb-6 flex items-center gap-2">
              <DollarSign size={16} /> Food Court Revenue Share
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts?.popularFood || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                    fontSize={10}
                  >
                    {(charts?.popularFood || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `PKR ${value}`} contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-[10px] text-cinema-gray mt-4 border-t border-white/5 pt-4">
              {(charts?.popularFood || []).map((entry, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span>{entry.name}: PKR {entry.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
