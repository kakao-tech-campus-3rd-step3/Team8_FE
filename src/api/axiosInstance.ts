import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { ENDPOINTS } from './endpoints'; // ENDPOINTS를 import 합니다.

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://3.133.89.210:8080',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
const getRefreshToken = () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
const setAccessToken = (token: string) => localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
const setRefreshToken = (token: string) => localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
const clearTokens = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

const AUTH_EXCLUDED_PATHS = new Set<string>([ENDPOINTS.auth.login, ENDPOINTS.auth.signup]);
function isAuthExcluded(url?: string) {
  if (!url) return false;
  return AUTH_EXCLUDED_PATHS.has(url);
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = getAccessToken();
    const skipAuth = isAuthExcluded(config.url);
    if (access && !skipAuth) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
const refreshSubscribers: Array<(token: string | null) => void> = [];

function subscribeTokenRefresh(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb);
}

function notifyTokenRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers.length = 0;
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await axios.post(
      ENDPOINTS.auth.refresh,
      { refreshToken: refresh },
      { headers: { 'Content-Type': 'application/json' } },
    );
    const newAccess = res.data?.accessToken;
    const newRefresh = res.data?.refreshToken;

    if (newAccess) setAccessToken(newAccess);
    if (newRefresh) setRefreshToken(newRefresh);

    notifyTokenRefreshed(newAccess ?? null);
    return newAccess ?? null;
  } catch (e) {
    clearTokens();
    notifyTokenRefreshed(null);
    return null;
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config, response } = error;
    const originalRequest = config as AxiosRequestConfig & { _retry?: boolean };

    if (response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newAccess) => {
            if (newAccess && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccess}`;
              resolve(axiosInstance(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      } else {
        isRefreshing = true;
        try {
          const newAccess = await refreshAccessToken();
          if (newAccess && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return axiosInstance(originalRequest);
          }
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;