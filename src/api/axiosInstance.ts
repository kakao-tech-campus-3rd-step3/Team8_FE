import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { ENDPOINTS } from './endpoints';

const API_BASE_URL = 'http://3.133.89.210:8080';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
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

// --- 요청 인터셉터 (변경 없음) ---
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

// --- 응답 인터셉터 (토큰 리프레시 로직) ---
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
    // ✅ 2. 토큰 재발급 요청은 baseURL이 포함된 별도의 axios 요청을 사용해야 합니다.
    const res = await axios.post(
      `${API_BASE_URL}${ENDPOINTS.auth.refresh}`, // 전체 URL을 사용
      { refreshToken: refresh },
      { headers: { 'Content-Type': 'application/json' } }
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
    // 로그인 페이지로 리다이렉트 또는 다른 에러 처리
    // window.location.href = '/login';
    return null;
  }
}

// ✅ 3. 서버 응답이 401인지 403인지에 따라 조건을 맞춰주세요. (우선 401로 가정)
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
          } else {
            // 새 토큰 발급 실패 시 에러 처리
            clearTokens();
            // window.location.href = '/login';
            return Promise.reject(error);
          }
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;