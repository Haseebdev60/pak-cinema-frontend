import api, { USE_MOCK } from './config';
import { dbMock } from './dbMock';
import { normalizeEmployee } from './normalizer';

export const employeeService = {
  getEmployees: async () => {
    if (USE_MOCK) return dbMock.getEmployees();
    const response = await api.get('/employees');
    return (response.data || []).map(normalizeEmployee);
  },
  getEmployeeById: async (id) => {
    if (USE_MOCK) return dbMock.getEmployeeById(id);
    const response = await api.get(`/employees/${id}`);
    return normalizeEmployee(response.data);
  },
  addEmployee: async (employee) => {
    if (USE_MOCK) return dbMock.addEmployee(employee);
    const response = await api.post('/employees', employee);
    return response.data;
  },
  updateEmployee: async (id, employee) => {
    if (USE_MOCK) return dbMock.updateEmployee(id, employee);
    const response = await api.put(`/employees/${id}`, employee);
    return response.data;
  },
  deleteEmployee: async (id) => {
    if (USE_MOCK) return dbMock.deleteEmployee(id);
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  }
};

export default employeeService;
