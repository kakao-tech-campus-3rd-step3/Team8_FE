import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { type MemberType } from '@/types/member';
import { STORAGE_KEYS } from '@/utils/storageKeys';

type User = MemberType;

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (params: { accessToken: string; refreshToken: string; user: User }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // localStorage에서 토큰과 유저 정보 불러오기
    const storedAccess = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const storedRefresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

    if (storedAccess) setAccessToken(storedAccess);
    if (storedRefresh) setRefreshToken(storedRefresh);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse auth user from localStorage', error);
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
    }

    // 동일 탭 내에서 axiosInstance의 토큰 변경을 감지하기 위한 브라우저 이벤트 리스너 설정
    const handleRefreshed = (e: Event) => {
      const detail = (
        e as CustomEvent<{ accessToken: string | null; refreshToken?: string | null }>
      ).detail;
      if (detail?.accessToken !== undefined) setAccessToken(detail.accessToken);
      if (detail?.refreshToken !== undefined && detail.refreshToken !== null)
        setRefreshToken(detail.refreshToken);
    };
    const handleCleared = () => {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    };
    window.addEventListener('auth:tokenRefreshed', handleRefreshed as EventListener);
    window.addEventListener('auth:tokensCleared', handleCleared);
    return () => {
      window.removeEventListener('auth:tokenRefreshed', handleRefreshed as EventListener);
      window.removeEventListener('auth:tokensCleared', handleCleared);
    };
  }, []);

  const login: AuthContextType['login'] = ({ accessToken, refreshToken, user }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  };

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
