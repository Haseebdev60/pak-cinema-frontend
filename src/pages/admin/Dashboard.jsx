import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Film, Monitor, Users, Ticket, UserSquare2, ShoppingBag, Landmark, Clock } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dbStats = await adminService.getDashboardStats();
        setStats(dbStats.stats);
        setActivity(dbStats.recentActivity);

        const dbCharts = await adminService.getAnalyticsData();
        setCharts(dbCharts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-bg flex items-center justify-center text-white">
        Loading admin console...
      </div>
    );
  }

  const statCards = [
    { name: 'Total Movies', value: stats.totalMovies, icon: <Film size={20} />, color: 'text-blue-500 bg-blue-500/10' },
    { name: 'Total Screens', value: stats.totalScreens, icon: <Monitor size={20} />, color: 'text-purple-500 bg-purple-500/10' },
    { name: 'Total Customers', value: stats.totalCustomers, icon: <Users size={20} />, color: 'text-indigo-500 bg-indigo-500/10' },
    { name: 'Total Bookings', value: stats.totalBookings, icon: <Ticket size={20} />, color: 'text-cinema-red bg-cinema-red/10' },
    { name: 'Total Tickets', value: stats.totalTickets, icon: <Ticket size={20} className="rotate-45" />, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'Total Employees', value: stats.totalEmployees, icon: <UserSquare2 size={20} />, color: 'text-orange-500 bg-orange-500/10' },
    { name: 'Total Orders', value: stats.totalOrders, icon: <ShoppingBag size={20} />, color: 'text-pink-500 bg-pink-500/10' },
    { name: 'Monthly Revenue', value: `PKR ${stats.monthlyRevenue}`, icon: <Landmark size={20} />, color: 'text-cinema-gold bg-cinema-gold/10' },
  ];

  return (
    <div className="min-h-screen bg-cinema-bg flex">
      {/* Admin Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <main className="flex-1 ml-64 p-8 min-h-screen space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-wider">Dashboard Overview</h1>
            <p className="text-cinema-gray text-xs mt-1 uppercase tracking-widest font-semibold">
              CineGold Management System Console
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs text-cinema-gold font-bold">
            <Clock size={14} />
            <span>PKT Timezone Active</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-cinema-gray uppercase tracking-wider block">{card.name}</span>
                <span className="text-2xl font-black text-white block mt-1.5">{card.value}</span>
              </div>
              <span className={`p-3 rounded-xl shrink-0 ${card.color}`}>
                {card.icon}
              </span>
            </div>
          ))}
        </div>

        {/* Charts and Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Charts (Left Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Area Chart */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-cinema-gold uppercase tracking-wider mb-6">Weekly Revenue Streams</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={charts?.revenueData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E50914" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#E50914" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#666" fontSize={11} />
                    <YAxis stroke="#666" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }} />
                    <Legend wrapperStyle={{ fontSize: 11, pt: 10 }} />
                    <Area name="Ticket Sales (PKR)" type="monotone" dataKey="Tickets" stroke="#E50914" strokeWidth={2} fillOpacity={1} fill="url(#colorTickets)" />
                    <Area name="Concessions Sales (PKR)" type="monotone" dataKey="Concessions" stroke="#FFD700" strokeWidth={2} fillOpacity={1} fill="url(#colorFood)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Movie demand chart */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-cinema-gold uppercase tracking-wider mb-6">Popular Movies Demand</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts?.moviePopularity || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#666" fontSize={10} tickFormatter={(value) => value.slice(0, 12) + '...'} />
                    <YAxis stroke="#666" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }} />
                    <Bar name="Tickets Sold" dataKey="Tickets" fill="#E50914" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity (Right Column) */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 h-full flex flex-col">
              <h3 className="text-sm font-bold text-cinema-gold uppercase tracking-wider mb-6 border-b border-white/5 pb-4">
                Recent DB Transactions
              </h3>
              
              <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                {activity.map((act) => (
                  <div key={act.id} className="flex gap-3 relative pb-4 border-l-2 border-white/10 pl-4 last:border-0 last:pb-0">
                    {/* Visual dot indicator */}
                    <div className={`w-3 h-3 rounded-full absolute -left-[7px] top-1 ${
                      act.type === 'booking' ? 'bg-cinema-red' : 'bg-cinema-gold'
                    }`}></div>
                    
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">{act.title}</h4>
                      <p className="text-cinema-gray text-xs mt-1 leading-relaxed">{act.desc}</p>
                      <span className="text-[10px] text-white/40 block mt-2">{act.time} PKT</span>
                    </div>
                  </div>
                ))}

                {activity.length === 0 && (
                  <p className="text-cinema-gray text-center text-xs py-8">No recent transactions recorded today.</p>
                )}
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
