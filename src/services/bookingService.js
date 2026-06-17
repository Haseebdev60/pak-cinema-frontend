import api, { USE_MOCK } from './config';
import { dbMock } from './dbMock';
import {
  normalizeCustomer, normalizeScreen, normalizeShowtime,
  normalizeBooking, normalizeTicket
} from './normalizer';

export const bookingService = {
  // --- SCREENS ---
  getScreens: async () => {
    if (USE_MOCK) return dbMock.getScreens();
    const response = await api.get('/screens');
    return (response.data || []).map(normalizeScreen);
  },
  getScreenById: async (id) => {
    if (USE_MOCK) return dbMock.getScreenById(id);
    const response = await api.get(`/screens/${id}`);
    return normalizeScreen(response.data);
  },
  addScreen: async (screen) => {
    if (USE_MOCK) return dbMock.addScreen(screen);
    const response = await api.post('/screens', screen);
    return response.data;
  },
  updateScreen: async (id, screen) => {
    if (USE_MOCK) return dbMock.updateScreen(id, screen);
    const response = await api.put(`/screens/${id}`, screen);
    return response.data;
  },
  deleteScreen: async (id) => {
    if (USE_MOCK) return dbMock.deleteScreen(id);
    const response = await api.delete(`/screens/${id}`);
    return response.data;
  },

  // --- SHOWTIMES ---
  getShowtimes: async () => {
    if (USE_MOCK) return dbMock.getShowtimes();
    const response = await api.get('/showtimes');
    return (response.data || []).map(st => normalizeShowtime(st));
  },
  getShowtimeById: async (id) => {
    if (USE_MOCK) return dbMock.getShowtimeById(id);
    const response = await api.get(`/showtimes/${id}`);
    return normalizeShowtime(response.data);
  },
  addShowtime: async (showtime) => {
    if (USE_MOCK) return dbMock.addShowtime(showtime);
    const response = await api.post('/showtimes', showtime);
    return response.data;
  },
  updateShowtime: async (id, showtime) => {
    if (USE_MOCK) return dbMock.updateShowtime(id, showtime);
    const response = await api.put(`/showtimes/${id}`, showtime);
    return response.data;
  },
  deleteShowtime: async (id) => {
    if (USE_MOCK) return dbMock.deleteShowtime(id);
    const response = await api.delete(`/showtimes/${id}`);
    return response.data;
  },

  // --- CUSTOMERS ---
  getCustomers: async () => {
    if (USE_MOCK) return dbMock.getCustomers();
    const response = await api.get('/customers');
    return (response.data || []).map(normalizeCustomer);
  },
  getCustomerById: async (id) => {
    if (USE_MOCK) return dbMock.getCustomerById(id);
    const response = await api.get(`/customers/${id}`);
    return normalizeCustomer(response.data);
  },
  addCustomer: async (customer) => {
    if (USE_MOCK) return dbMock.addCustomer(customer);
    const response = await api.post('/customers', {
      CustomerName: customer.name,
      Phone: customer.phone,
      CNIC: customer.cnic,
      Email: customer.email
    });
    return response.data;
  },
  updateCustomer: async (id, customer) => {
    if (USE_MOCK) return dbMock.updateCustomer(id, customer);
    const response = await api.put(`/customers/${id}`, {
      CustomerName: customer.name,
      Phone: customer.phone,
      CNIC: customer.cnic,
      Email: customer.email
    });
    return response.data;
  },
  deleteCustomer: async (id) => {
    if (USE_MOCK) return dbMock.deleteCustomer(id);
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  },

  // --- BOOKINGS ---
  getBookings: async () => {
    if (USE_MOCK) return dbMock.getBookings();
    const response = await api.get('/bookings');
    return (response.data || []).map(normalizeBooking);
  },
  getBookingById: async (id) => {
    if (USE_MOCK) return dbMock.getBookingById(id);
    const response = await api.get(`/bookings/${id}`);
    return normalizeBooking(response.data);
  },
  createBooking: async (bookingData) => {
    if (USE_MOCK) return dbMock.createBooking(bookingData);
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  deleteBooking: async (id) => {
    if (USE_MOCK) return dbMock.deleteBooking(id);
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

  // --- TICKETS ---
  getTickets: async () => {
    if (USE_MOCK) return dbMock.getTickets();
    const response = await api.get('/tickets');
    return (response.data || []).map(normalizeTicket);
  },
  getTicketById: async (id) => {
    if (USE_MOCK) return dbMock.getTicketById(id);
    const response = await api.get(`/tickets/${id}`);
    return normalizeTicket(response.data);
  },
  addTicket: async (ticket) => {
    if (USE_MOCK) return dbMock.addTicket(ticket);
    const response = await api.post('/tickets', ticket);
    return response.data;
  },
  updateTicket: async (id, ticket) => {
    if (USE_MOCK) return dbMock.updateTicket(id, ticket);
    const response = await api.put(`/tickets/${id}`, ticket);
    return response.data;
  },
  deleteTicket: async (id) => {
    if (USE_MOCK) return dbMock.deleteTicket(id);
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
  }
};

export default bookingService;
