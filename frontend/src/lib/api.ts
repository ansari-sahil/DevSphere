
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use(config=>{
  const token = localStorage.getItem('access');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res=>res,
  async error=>{
    if(error.response?.status===401){
      const refresh = localStorage.getItem('refresh');
      const res = await axios.post('http://localhost:5000/api/auth/refresh',{ refresh });
      localStorage.setItem('access', res.data.access);
      error.config.headers.Authorization = `Bearer ${res.data.access}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;
