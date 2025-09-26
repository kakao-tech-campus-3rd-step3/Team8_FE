import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { STORAGE_KEYS } from '@/utils/storageKeys';

// 환경변수로 베이스 URL 관리
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'; // 로컬 테스트용 기본값 추가

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // 서버가 쿠키 기반 리프레시를 쓴다면 true로 변경해야함
});

// 토큰 관리 유틸
const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
const getRefreshToken = () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
const setAccessToken = (token: string) => localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
const setRefreshToken = (token: string) => localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
const clearTokens = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

// 매 요청에 access token 헤더를 자동으로 붙임
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = getAccessToken();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답이 401(만료/인증실패)이면 refresh 시도 후 원래 요청 재시도
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await axios.post(
      `${API_BASE_URL}/auth/refresh`, // 리프레시 엔드포인트가 어떻게 될지 모르겠어서 임시로 이렇게 했습니다.
      { refreshToken: refresh }, // 이부분도 API 스펙에 맞게 조정 필요합니다.
      { headers: { 'Content-Type': 'application/json' } }
    );
    const newAccess = res.data?.accessToken as string | undefined;
    const newRefresh = (res.data?.refreshToken as string | undefined) ?? undefined;

    if (newAccess) setAccessToken(newAccess);
    if (newRefresh) setRefreshToken(newRefresh);
    try {
      window.dispatchEvent(
        new CustomEvent('auth:tokenRefreshed', {
          detail: { accessToken: newAccess ?? null, refreshToken: newRefresh ?? null },
        })
      );
    } catch {}

    return newAccess ?? null;
  } catch (e) {
    // Refresh 실패시 토큰 제거
    clearTokens();
    try {
      window.dispatchEvent(new Event('auth:tokensCleared'));
    } catch {}
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

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(() => {
          isRefreshing = false;
        });
      }

      const newAccess = await (refreshPromise as Promise<string | null>);

      if (newAccess) {
        // 토큰 교체 후 재시도
        originalRequest.headers = {
          ...(originalRequest.headers || {}),
          Authorization: `Bearer ${newAccess}`,
        } as any;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
