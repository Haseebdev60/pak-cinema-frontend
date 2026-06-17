import api, { USE_MOCK } from './config';
import { dbMock } from './dbMock';
import { normalizeConcession, normalizeOrder } from './normalizer';

export const concessionService = {
  // --- CONCESSIONS ---
  getConcessions: async () => {
    if (USE_MOCK) return dbMock.getConcessions();
    const response = await api.get('/concessions');
    return (response.data || []).map(normalizeConcession);
  },
  getConcessionById: async (id) => {
    if (USE_MOCK) return dbMock.getConcessionById(id);
    const response = await api.get(`/concessions/${id}`);
    return normalizeConcession(response.data);
  },
  addConcession: async (concession) => {
    if (USE_MOCK) return dbMock.addConcession(concession);
    const response = await api.post('/concessions', concession);
    return response.data;
  },
  updateConcession: async (id, concession) => {
    if (USE_MOCK) return dbMock.updateConcession(id, concession);
    const response = await api.put(`/concessions/${id}`, concession);
    return response.data;
  },
  deleteConcession: async (id) => {
    if (USE_MOCK) return dbMock.deleteConcession(id);
    const response = await api.delete(`/concessions/${id}`);
    return response.data;
  },

  // --- ORDERS ---
  getOrders: async () => {
    if (USE_MOCK) return dbMock.getOrders();
    const response = await api.get('/orders');
    return (response.data || []).map(normalizeOrder);
  },
  getOrderById: async (id) => {
    if (USE_MOCK) return dbMock.getOrderById(id);
    const response = await api.get(`/orders/${id}`);
    return normalizeOrder(response.data);
  },
  addOrder: async (order) => {
    if (USE_MOCK) return dbMock.addOrder(order);
    const response = await api.post('/orders', order);
    return response.data;
  },
  updateOrder: async (id, order) => {
    if (USE_MOCK) return dbMock.updateOrder(id, order);
    const response = await api.put(`/orders/${id}`, order);
    return response.data;
  },
  deleteOrder: async (id) => {
    if (USE_MOCK) return dbMock.deleteOrder(id);
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  }
};

export default concessionService;
