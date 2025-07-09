import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

export default axiosInstance;
