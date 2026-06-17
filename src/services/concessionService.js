import api from './config';

export const concessionService = {
  // --- CONCESSIONS ---
  getConcessions: async () => {
    const res = await api.get('/concessions');
    return res.data;
  },
  getConcessionById: async (id) => {
    const res = await api.get(`/concessions/${id}`);
    return res.data;
  },
  addConcession: async (concession) => {
    const res = await api.post('/concessions', concession);
    return res.data;
  },
  updateConcession: async (id, concession) => {
    const res = await api.put(`/concessions/${id}`, concession);
    return res.data;
  },
  deleteConcession: async (id) => {
    const res = await api.delete(`/concessions/${id}`);
    return res.data;
  },

  // --- ORDERS ---
  getOrders: async () => {
    const res = await api.get('/orders');
    return res.data;
  },
  getOrderById: async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },
  addOrder: async (order) => {
    const res = await api.post('/orders', order);
    return res.data;
  },
  updateOrder: async (id, order) => {
    const res = await api.put(`/orders/${id}`, order);
    return res.data;
  },
  deleteOrder: async (id) => {
    const res = await api.delete(`/orders/${id}`);
    return res.data;
  },
};

export default concessionService;
