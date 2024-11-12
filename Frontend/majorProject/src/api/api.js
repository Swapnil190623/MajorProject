import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,  // This allows cookies to be sent with requests 
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

// Interceptor to include token with every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  

export default api;
