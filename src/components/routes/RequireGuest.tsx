import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PATH } from '@/utils/path';

export default function RequireGuest() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH.HOME} replace />;
  }

  return <Outlet />;
}

