import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //import anything specified in an environment variable file, easy to load and change url
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; //How you embed a token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api; //exporting api object to handle requests