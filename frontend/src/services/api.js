import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // Importante si el backend requiere credenciales
});

export default api;
