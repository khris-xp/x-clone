import { baseUrl } from '@/secret/path';
import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios';
import Cookies from 'js-cookie';

const baseURL: string = baseUrl;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `${token}`;
    }
    return config;
};

const responseInterceptor = (response: AxiosResponse) => {
    return response;
};

const errorInterceptor = (error: AxiosError) => {
    return error;
};

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default axiosInstance;