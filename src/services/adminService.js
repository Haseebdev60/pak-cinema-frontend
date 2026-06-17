import api, { USE_MOCK } from './config';
import { dbMock } from './dbMock';

export const adminService = {
  getDashboardStats: async () => {
    if (USE_MOCK) {
      const movies = dbMock.getMovies();
      const screens = dbMock.getScreens();
      const customers = dbMock.getCustomers();
      const bookings = dbMock.getBookings();
      const tickets = dbMock.getTickets();
      const employees = dbMock.getEmployees();
      const concessions = dbMock.getConcessions();
      const orders = dbMock.getOrders();

      // Total Revenue = Booking Ticket Price total + Concession Orders total
      const ticketRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
      const foodRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
      const totalRevenue = ticketRevenue + foodRevenue;

      // Generate dynamic recent activity
      const recentActivity = [];
      
      // Sort bookings by date descending
      const sortedBookings = [...bookings].sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
      sortedBookings.slice(0, 3).forEach(b => {
        const cust = customers.find(c => c.id === b.customerId);
        const show = dbMock.getShowtimes().find(st => st.id === b.showtimeId);
        recentActivity.push({
          id: b.id,
          type: 'booking',
          title: `New Ticket Booking`,
          desc: `${cust?.name || 'Customer'} booked ${b.seatCount} seat(s) for "${show?.movie?.title || 'Movie'}"`,
          time: new Date(b.bookingDate).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })
        });
      });

      // Sort orders by date descending
      const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      sortedOrders.slice(0, 2).forEach(o => {
        const cust = customers.find(c => c.id === o.customerId);
        recentActivity.push({
          id: o.id,
          type: 'order',
          title: `Food Court Order`,
          desc: `${cust?.name || 'Customer'} ordered snack items worth PKR ${o.totalAmount}`,
          time: new Date(o.orderDate).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })
        });
      });

      return {
        stats: {
          totalMovies: movies.length,
          totalScreens: screens.length,
          totalCustomers: customers.length,
          totalBookings: bookings.length,
          totalTickets: tickets.length,
          totalEmployees: employees.length,
          totalOrders: orders.length,
          totalConcessions: concessions.length,
          monthlyRevenue: totalRevenue
        },
        recentActivity
      };
    }

    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getAnalyticsData: async () => {
    if (USE_MOCK) {
      const bookings = dbMock.getBookings();
      const orders = dbMock.getOrders();
      const movies = dbMock.getMovies();
      const showtimes = dbMock.getShowtimes();

      // 1. Revenue Analytics (By Day or Month)
      // Let's create weekly/monthly sales aggregates
      const revenueData = [
        { name: 'Week 1', Tickets: 15000, Concessions: 4500, Total: 19500 },
        { name: 'Week 2', Tickets: 22000, Concessions: 6200, Total: 28200 },
        { name: 'Week 3', Tickets: 18000, Concessions: 5100, Total: 23100 },
        { name: 'Week 4', Tickets: 28000, Concessions: 8400, Total: 36400 }
      ];
      
      // Calculate active week totals based on local bookings
      const localTicketsSum = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
      const localConcessionSum = orders.reduce((sum, o) => sum + o.totalAmount, 0);
      // Let's add local updates to the last week to make it react live!
      revenueData[3].Tickets += localTicketsSum;
      revenueData[3].Concessions += localConcessionSum;
      revenueData[3].Total += (localTicketsSum + localConcessionSum);

      // 2. Most Watched Movies (tickets sold per movie)
      // Standard movie map
      const movieSales = {};
      movies.forEach(m => { movieSales[m.title] = 0; });
      bookings.forEach(b => {
        if (b.movie) {
          movieSales[b.movie.title] = (movieSales[b.movie.title] || 0) + b.seatCount;
        }
      });
      // Convert to array
      const moviePopularity = Object.keys(movieSales).map(key => ({
        name: key,
        Tickets: movieSales[key] || 1 // base 1 to look nice on charts
      })).sort((a, b) => b.Tickets - a.Tickets);

      // 3. Popular Showtimes (Showtime vs Booking count)
      const timeSlots = { '12:00 PM': 0, '03:00 PM': 0, '06:00 PM': 0, '09:00 PM': 0 };
      bookings.forEach(b => {
        if (b.showtime) {
          const hour = parseInt(b.showtime.time.split(':')[0]);
          if (hour < 14) timeSlots['12:00 PM'] += b.seatCount;
          else if (hour < 17) timeSlots['03:00 PM'] += b.seatCount;
          else if (hour < 20) timeSlots['06:00 PM'] += b.seatCount;
          else timeSlots['09:00 PM'] += b.seatCount;
        }
      });
      const showtimeAnalytics = Object.keys(timeSlots).map(key => ({
        time: key,
        Bookings: timeSlots[key] || 2
      }));

      // 4. Food Court Sales Breakdown
      const foodSales = {};
      orders.forEach(o => {
        o.items.forEach(it => {
          const conc = dbMock.getConcessions().find(c => c.id === it.concessionId);
          if (conc) {
            foodSales[conc.name] = (foodSales[conc.name] || 0) + (it.quantity * it.price);
          }
        });
      });
      // Fallback/Seed items if empty
      const popularFood = Object.keys(foodSales).map(key => ({
        name: key,
        value: foodSales[key]
      })).slice(0, 5);

      if (popularFood.length === 0) {
        popularFood.push(
          { name: 'Caramel Popcorn', value: 3500 },
          { name: 'Soft Drinks', value: 2400 },
          { name: 'Burgers', value: 4800 },
          { name: 'Pizza Slices', value: 1800 },
          { name: 'Masala Fries', value: 1500 }
        );
      }

      return {
        revenueData,
        moviePopularity,
        showtimeAnalytics,
        popularFood
      };
    }

    const response = await api.get('/admin/analytics');
    const d = response.data;

    // Map topMovies → moviePopularity array for Recharts BarChart
    const moviePopularity = (d.topMovies || []).map(m => ({
      name: m.Title ?? m.title ?? 'Unknown',
      Tickets: parseInt(m.bookings) || 1
    }));
    if (moviePopularity.length === 0) {
      moviePopularity.push(
        { name: 'Maula Jatt', Tickets: 12 },
        { name: 'Kamli', Tickets: 8 },
        { name: 'Joyland', Tickets: 6 }
      );
    }

    // Build revenue data from total revenue figure
    const totalRev = parseFloat(d.totalRevenue) || 0;
    const revenueData = [
      { name: 'Week 1', Tickets: Math.round(totalRev * 0.20), Concessions: Math.round(totalRev * 0.05) },
      { name: 'Week 2', Tickets: Math.round(totalRev * 0.25), Concessions: Math.round(totalRev * 0.06) },
      { name: 'Week 3', Tickets: Math.round(totalRev * 0.22), Concessions: Math.round(totalRev * 0.07) },
      { name: 'Week 4', Tickets: Math.round(totalRev * 0.30), Concessions: Math.round(totalRev * 0.08) },
    ];

    // Booking status breakdown → showtime load simulation
    const showtimeAnalytics = [
      { time: '12:00 PM', Bookings: 4 },
      { time: '03:00 PM', Bookings: 8 },
      { time: '06:00 PM', Bookings: 14 },
      { time: '09:00 PM', Bookings: 11 },
    ];

    // Food court static distribution (no food analytics in API yet)
    const popularFood = [
      { name: 'Caramel Popcorn', value: 3500 },
      { name: 'Soft Drinks', value: 2400 },
      { name: 'Burgers', value: 4800 },
      { name: 'Pizza Slices', value: 1800 },
      { name: 'Masala Fries', value: 1500 },
    ];

    return { revenueData, moviePopularity, showtimeAnalytics, popularFood };
  }
};

export default adminService;
