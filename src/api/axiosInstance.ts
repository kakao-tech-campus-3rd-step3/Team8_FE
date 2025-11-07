import axios from 'axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { STORAGE_KEYS } from '@/utils/storageKeys';

// .env(local)에서 주입된 VITE_API_BASE_URL 사용
const API_BASE_URL: string | undefined = import.meta.env.VITE_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
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
const AUTH_EXCLUDED_LIST = ['/v1/auth/login', '/v1/auth/signup', '/v1/auth/refresh'] as const;
type AuthExcludedPath = (typeof AUTH_EXCLUDED_LIST)[number];
const AUTH_EXCLUDED_PATHS = new Set<AuthExcludedPath>(AUTH_EXCLUDED_LIST);

function isAuthExcluded(url?: string) {
  if (!url) return false;
  try {
    // 인스턴스의 baseURL(없으면 현재 오리진)을 기준으로 절대 URL 생성 후 pathname 비교
    const base = axiosInstance.defaults.baseURL ?? window.location.origin;
    const u = url.startsWith('http') ? new URL(url) : new URL(url, base);
    return AUTH_EXCLUDED_PATHS.has(u.pathname as AuthExcludedPath);
  } catch {
    // 최후 폴백: 문자열 비교 (오타 방지를 위해 Set의 유니온 타입과 맞춰 캐스팅)
    return AUTH_EXCLUDED_PATHS.has(url as AuthExcludedPath);
  }
}

// 서버의 토큰 오류 포맷을 400 + { code: 'AE_002' }로 인식하여
// 액세스 토큰 리프레시 트리거 대상으로 간주한다.
function isTokenBadError(res?: AxiosError['response']) {
  if (!res) return false;
  if (res.status !== 400) return false;
  const data = res.data as unknown;
  const code =
    typeof data === 'object' && data !== null && 'code' in (data as Record<string, unknown>)
      ? (data as Record<string, unknown>).code
      : undefined;
  return code === 'AE_002';
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
  (error) => Promise.reject(error)
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
    const res = await axiosInstance.post(
      ENDPOINTS.auth.refresh,
      { refreshToken: refresh },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const newAccess = res.data?.accessToken;
    const newRefresh = res.data?.refreshToken;

    if (newAccess) setAccessToken(newAccess);
    if (newRefresh) setRefreshToken(newRefresh);

    window.dispatchEvent(
      new CustomEvent('auth:tokenRefreshed', {
        detail: { accessToken: newAccess, refreshToken: newRefresh },
      })
    );
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

    // 토큰 오류: 401 또는 400 + AE_002 에서 리프레시 로직을 트리거
    if ((response?.status === 401 || isTokenBadError(response)) && originalRequest && !originalRequest._retry) {
      // 리프레시 요청 자체는 재시도/리프레시를 하지 않고 즉시 실패 처리
      try {
        const base = axiosInstance.defaults.baseURL ?? window.location.origin;
        const reqUrl = originalRequest.url ?? '';
        const pathname = reqUrl.startsWith('http')
          ? new URL(reqUrl).pathname
          : new URL(reqUrl, base).pathname;
        if (pathname === ENDPOINTS.auth.refresh) {
          return Promise.reject(error);
        }
      } catch {}

      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newAccess) => {
            if (newAccess) {
              originalRequest.headers = {
                ...(originalRequest.headers || {}),
                Authorization: `Bearer ${newAccess}`,
              };
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
          if (newAccess) {
            originalRequest.headers = {
              ...(originalRequest.headers || {}),
              Authorization: `Bearer ${newAccess}`,
            };
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
