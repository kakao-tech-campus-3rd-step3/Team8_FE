import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { STORAGE_KEYS } from '@/utils/storageKeys';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (params: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // localStorage에서 토큰 불러오기
    const storedAccess = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const storedRefresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (storedAccess) setAccessToken(storedAccess);
    if (storedRefresh) setRefreshToken(storedRefresh);

    // 동일 탭 내에서 axiosInstance의 토큰 변경을 감지하기 위한 브라우저 이벤트 리스너 설정
    const handleRefreshed = (e: WindowEventMap['auth:tokenRefreshed']) => {
      const { accessToken, refreshToken } = e.detail ?? {};
      if (accessToken !== undefined) setAccessToken(accessToken);
      if (refreshToken !== undefined && refreshToken !== null) setRefreshToken(refreshToken);
    };
    const handleCleared = (_e: WindowEventMap['auth:tokensCleared']) => {
      setAccessToken(null);
      setRefreshToken(null);
    };
    window.addEventListener('auth:tokenRefreshed', handleRefreshed);
    window.addEventListener('auth:tokensCleared', handleCleared);
    return () => {
      window.removeEventListener('auth:tokenRefreshed', handleRefreshed);
      window.removeEventListener('auth:tokensCleared', handleCleared);
    };
  }, []);

  const login: AuthContextType['login'] = ({ accessToken, refreshToken }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  };

  const value: AuthContextType = {
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
