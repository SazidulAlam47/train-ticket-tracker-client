import axios from 'axios';
import { authKey } from '@/constants/auth.constant';
import { getFromLocalStorage } from './localStorage';

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers['Accept'] = 'application/json';
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = getFromLocalStorage(authKey);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default axiosInstance;
