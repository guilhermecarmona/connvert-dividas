import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8880',
});

export default api;
