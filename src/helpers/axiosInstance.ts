import axios from 'axios';
import { getFromLocalStorage } from '@/utils/localStorage';

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers['Accept'] = 'application/json';
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

axiosInstance.interceptors.request.use(
    function (config) {
        const token = getFromLocalStorage('token');
        const ssdk = getFromLocalStorage('ssdk');
        const uudid = getFromLocalStorage('uudid');

        config.headers['x-requested-with'] = 'XMLHttpRequest';

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (uudid) {
            config.headers['x-device-id'] = uudid;
        }
        if (ssdk) {
            config.headers['x-device-key'] = ssdk;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default axiosInstance;
