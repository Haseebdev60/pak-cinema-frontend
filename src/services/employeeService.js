import api from './config';

export const employeeService = {
  getEmployees: async () => {
    const res = await api.get('/employees');
    return res.data;
  },
  getEmployeeById: async (id) => {
    const res = await api.get(`/employees/${id}`);
    return res.data;
  },
  addEmployee: async (employee) => {
    const res = await api.post('/employees', employee);
    return res.data;
  },
  updateEmployee: async (id, employee) => {
    const res = await api.put(`/employees/${id}`, employee);
    return res.data;
  },
  deleteEmployee: async (id) => {
    const res = await api.delete(`/employees/${id}`);
    return res.data;
  },
};

export default employeeService;
