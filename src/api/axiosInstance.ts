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

// 로그인/회원가입은 Authorization 헤더 제외 대상 (member권한 필요없음)
const AUTH_EXCLUDED_LIST = ['/v1/auth/login', '/v1/auth/signup'] as const;
type AuthExcludedPath = (typeof AUTH_EXCLUDED_LIST)[number];
const AUTH_EXCLUDED_PATHS = new Set<AuthExcludedPath>(AUTH_EXCLUDED_LIST);

function isAuthExcluded(url?: string) {
  if (!url) return false;
  try {
    // 기존 구현 (CORS 해결 시 복구 가능)
    // const u = url.startsWith('http') ? new URL(url) : new URL(url, API_BASE_URL);
    // return AUTH_EXCLUDED_PATHS.has(u.pathname as AuthExcludedPath);

    // 프록시 환경(/api)에서도 동작하도록 base를 절대 URL로 보정
    const absBase = API_BASE_URL.startsWith('http')
      ? API_BASE_URL
      : `${window.location.origin}${API_BASE_URL}`;
    const u = url.startsWith('http') ? new URL(url) : new URL(url, absBase);
    return AUTH_EXCLUDED_PATHS.has(u.pathname as AuthExcludedPath);
  } catch {
    // 최후 폴백: 문자열 비교 (오타 방지를 위해 Set의 유니온 타입과 맞춰 캐스팅)
    return AUTH_EXCLUDED_PATHS.has(url as AuthExcludedPath);
  }
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
      `${API_BASE_URL}/v1/auth/refresh`, // 리프레시 엔드포인트 수정 완료
      { refreshToken: refresh }, // 이부분도 API 스펙에 맞게 조정 필요합니다.
      { headers: { 'Content-Type': 'application/json' } }
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