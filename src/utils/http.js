import axios from 'axios';
// import router from '@/router/index';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/imposto/public/api/',
});

axiosInstance.interceptors.response.use((response) => response,
  (error) => { throw error; });

export default axiosInstance;
