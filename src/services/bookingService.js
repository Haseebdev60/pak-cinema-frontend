import api from './config';

export const bookingService = {
  // --- SCREENS ---
  getScreens: async () => {
    const res = await api.get('/screens');
    return res.data;
  },
  getScreenById: async (id) => {
    const res = await api.get(`/screens/${id}`);
    return res.data;
  },
  addScreen: async (screen) => {
    const res = await api.post('/screens', screen);
    return res.data;
  },
  updateScreen: async (id, screen) => {
    const res = await api.put(`/screens/${id}`, screen);
    return res.data;
  },
  deleteScreen: async (id) => {
    const res = await api.delete(`/screens/${id}`);
    return res.data;
  },

  // --- SHOWTIMES ---
  getShowtimes: async () => {
    const res = await api.get('/showtimes');
    return res.data;
  },
  getShowtimeById: async (id) => {
    const res = await api.get(`/showtimes/${id}`);
    return res.data;
  },
  addShowtime: async (showtime) => {
    const res = await api.post('/showtimes', showtime);
    return res.data;
  },
  updateShowtime: async (id, showtime) => {
    const res = await api.put(`/showtimes/${id}`, showtime);
    return res.data;
  },
  deleteShowtime: async (id) => {
    const res = await api.delete(`/showtimes/${id}`);
    return res.data;
  },

  // --- CUSTOMERS ---
  getCustomers: async () => {
    const res = await api.get('/customers');
    return res.data;
  },
  getCustomerById: async (id) => {
    const res = await api.get(`/customers/${id}`);
    return res.data;
  },
  addCustomer: async (customer) => {
    const res = await api.post('/customers', {
      name: customer.name,
      phone: customer.phone,
      cnic: customer.cnic,
      email: customer.email,
    });
    return res.data;
  },
  updateCustomer: async (id, customer) => {
    const res = await api.put(`/customers/${id}`, {
      name: customer.name,
      phone: customer.phone,
      cnic: customer.cnic,
      email: customer.email,
    });
    return res.data;
  },
  deleteCustomer: async (id) => {
    const res = await api.delete(`/customers/${id}`);
    return res.data;
  },

  // --- BOOKINGS ---
  getBookings: async () => {
    const res = await api.get('/bookings');
    return res.data;
  },
  getBookingById: async (id) => {
    const res = await api.get(`/bookings/${id}`);
    return res.data;
  },
  createBooking: async (bookingData) => {
    const res = await api.post('/bookings', bookingData);
    return res.data;
  },
  deleteBooking: async (id) => {
    const res = await api.delete(`/bookings/${id}`);
    return res.data;
  },

  // --- TICKETS ---
  getTickets: async () => {
    const res = await api.get('/tickets');
    return res.data;
  },
  getTicketById: async (id) => {
    const res = await api.get(`/tickets/${id}`);
    return res.data;
  },
  addTicket: async (ticket) => {
    const res = await api.post('/tickets', ticket);
    return res.data;
  },
  updateTicket: async (id, ticket) => {
    const res = await api.put(`/tickets/${id}`, ticket);
    return res.data;
  },
  deleteTicket: async (id) => {
    const res = await api.delete(`/tickets/${id}`);
    return res.data;
  },
};

export default bookingService;
