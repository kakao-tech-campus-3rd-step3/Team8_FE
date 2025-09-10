import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = '실제 API 서버 주소로 변경'; // 상수로 관리하는게 좋을듯합니다

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken'); // 토큰을 localStorage에서 가져옵니다.

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 401에러핸들링
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 에러핸들링 로직 추가 가능
      console.error('Unauthorized!');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
