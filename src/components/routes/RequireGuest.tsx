import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PATH } from '@/utils/path';

export default function RequireGuest() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname as string | undefined;

  if (isAuthenticated) {
    // 로그인 상태에서 게스트 페이지 접근 시, 원래 가려던(from) 경로가 있으면 그쪽으로 보냄
    return <Navigate to={from ?? PATH.HOME} replace />;
  }

  return <Outlet />;
}
