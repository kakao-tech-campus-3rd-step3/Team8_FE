import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PATH } from '@/utils/path';

export default function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

