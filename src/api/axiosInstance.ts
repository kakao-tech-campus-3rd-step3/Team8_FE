// src/api/axiosInstance.ts

import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { ENDPOINTS } from './endpoints';


// ✅ baseURL을 실제 서버 주소로 변경
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

// baseURL이 합쳐지기 전의 상대 경로와 비교해야 하므로 /api 접두사 제거
const AUTH_EXCLUDED_PATHS = new Set<string>([
  ENDPOINTS.auth.login,
  ENDPOINTS.auth.signup,
  ENDPOINTS.auth.refresh, // 토큰 재발급 요청도 인증이 필요 없습니다.
]);

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
    // 이 요청도 일관성을 위해 axiosInstance를 사용하도록 변경합니다.
    const res = await axiosInstance.post(
      ENDPOINTS.auth.refresh,
      { refreshToken: refresh }
    );
    const newAccess = res.data?.accessToken;
    const newRefresh = res.data?.refreshToken;

    if (newAccess) setAccessToken(newAccess);
    if (newRefresh) setRefreshToken(newRefresh);

    window.dispatchEvent(new CustomEvent('auth:tokenRefreshed', { detail: { accessToken: newAccess, refreshToken: newRefresh } }));
    notifyTokenRefreshed(newAccess ?? null);
    return newAccess ?? null;
  } catch (e) {
    clearTokens();
    window.dispatchEvent(new Event('auth:tokensCleared'));
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