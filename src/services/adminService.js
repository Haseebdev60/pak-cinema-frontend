import api from './config';

export const adminService = {
  getDashboardStats: async () => {
    const res = await api.get('/admin/dashboard');
    return res.data;
  },

  getAnalyticsData: async () => {
    const res = await api.get('/admin/analytics');
    return res.data;
  },

  adminLogin: async (credentials) => {
    const res = await api.post('/admin/login', credentials);
    return res.data;
  },
};

export default adminService;
