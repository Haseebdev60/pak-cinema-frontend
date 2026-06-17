import axios from 'axios';

// Toggle between simulated LocalStorage DB and the XAMPP PHP API
// Set to false when connecting to the SQL Server via PHP APIs
export const USE_MOCK = false;

export const API_BASE_URL = 'http://localhost/pak-cinema-api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to rewrite clean routing endpoints to direct PHP filenames
// (Provides robustness in case Apache's mod_rewrite is not enabled in XAMPP)
api.interceptors.request.use((config) => {
  let url = config.url;
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    const [pathPart, queryPart] = url.split('?');
    const parts = pathPart.split('/').filter(Boolean);
    
    if (parts.length > 0) {
      if (parts[0] === 'admin') {
        if (parts[1] === 'dashboard') {
          url = '/dashboard.php';
        } else if (parts[1] === 'analytics') {
          url = '/analytics.php';
        }
      } else if (parts[0] === 'analytics') {
        url = '/analytics.php';
      } else {
        const endpoint = parts[0];
        const id = parts[1];
        if (id) {
          url = `/${endpoint}.php?id=${id}`;
        } else {
          url = `/${endpoint}.php`;
        }
      }
      
      if (queryPart) {
        url += (url.includes('?') ? '&' : '?') + queryPart;
      }
    }
    config.url = url;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
