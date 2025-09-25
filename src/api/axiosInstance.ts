import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { STORAGE_KEYS } from '@/utils/storageKeys';

// 환경변수로 베이스 URL 관리
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false, // 서버가 쿠키 기반 리프레시를 쓴다면 true로 변경해야함
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

// 로그인/회원가입은 Authorization 헤더 제외 대상 (member권한 필요없음)
const AUTH_EXCLUDED_PATHS = new Set<string>(['/v1/members/login', '/v1/members/signup']);

function isAuthExcluded(url?: string) {
  if (!url) return false;
  try {
    const u = url.startsWith('http') ? new URL(url) : new URL(url, API_BASE_URL);
    return AUTH_EXCLUDED_PATHS.has(u.pathname);
  } catch {
    return false;
  }
}

// 매 요청에 access token 헤더를 자동으로 붙임
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = getAccessToken();
    const skipAuth = isAuthExcluded(config.url);
    if (access && !skipAuth) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답이 401(만료/인증실패)이면 refresh 시도 후 원요청 재시도
let isRefreshing = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];

function subscribeTokenRefresh(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb);
}

function notifyTokenRefreshed(token: string | null) {
  const subs = refreshSubscribers;
  refreshSubscribers = [];
  subs.forEach((cb) => {
    try {
      cb(token);
    } catch {}
  });
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await axios.post(
      `${API_BASE_URL}/v1/members/refresh`, // 리프레시 엔드포인트 수정 완료
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

    // 구독자들에게 새 토큰 전달
    notifyTokenRefreshed(newAccess ?? null);

    return newAccess ?? null;
  } catch (e) {
    // Refresh 실패시 토큰 제거
    clearTokens();
    try {
      window.dispatchEvent(new Event('auth:tokensCleared'));
    } catch {}
    // 구독자들에게 실패 전달(null)
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
        // 이미 리프레시 중: 새 Promise를 만들어 결과를 구독
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newAccess) => {
            if (newAccess) {
              originalRequest.headers = {
                ...(originalRequest.headers || {}),
                Authorization: `Bearer ${newAccess}`,
              } as any;
              resolve(axiosInstance(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      } else {
        // 최초 한 번만 실제 리프레시 호출
        isRefreshing = true;
        try {
          const newAccess = await refreshAccessToken();
          if (newAccess) {
            originalRequest.headers = {
              ...(originalRequest.headers || {}),
              Authorization: `Bearer ${newAccess}`,
            } as any;
            return axiosInstance(originalRequest);
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
