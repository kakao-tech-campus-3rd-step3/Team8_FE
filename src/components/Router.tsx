import HomePage from '@pages/home/HomePage';
import LandingPage from '@pages/landing/LandingPage';
import LoginPage from '@pages/login/LoginPage';
import PlanPage from '@pages/plan/PlanPage';
import RegisterPage from '@pages/register/RegisterPage';
import SpacePage from '@pages/space/SpacePage';
import RoutingPanel from '@/components/dev/RoutingPanel';
import { PATH } from '@utils/path';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ColorPanel from './dev/ColorPanel';
import FontPanel from './dev/FontPanel';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';

function RootRedirect() {
  const [isFirstVisit] = useState(() => localStorage.getItem('isFirstVisit') === null);

  useEffect(() => {
    if (isFirstVisit) {
      localStorage.setItem('isFirstVisit', 'false');
    }
  }, [isFirstVisit]);

  if (isFirstVisit) {
    return <LandingPage />;
  } else {
    return <Navigate to={PATH.HOME} replace />;
  }
}

function Router() {
  // 개발 모드에서만 토큰 리프레시/제거 이벤트를 콘솔로 추적합니다.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const onRefreshed = (e: WindowEventMap['auth:tokenRefreshed']) => {
      // 새 토큰(또는 null)을 콘솔에 출력하여 리프레시 성공 여부를 확인합니다.
      console.log('[auth] tokenRefreshed:', e.detail);
    };
    const onCleared = () => {
      // 리프레시 실패 등으로 토큰이 제거된 경우 확인합니다.
      console.log('[auth] tokensCleared');
    };
    window.addEventListener('auth:tokenRefreshed', onRefreshed);
    window.addEventListener('auth:tokensCleared', onCleared);
    return () => {
      window.removeEventListener('auth:tokenRefreshed', onRefreshed);
      window.removeEventListener('auth:tokensCleared', onCleared);
    };
  }, []);

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <>
          <RoutingPanel />
          <ColorPanel />
          <FontPanel />
          <ToastContainer />
        </>
      )}
      <Routes>
        <Route element={<MobileLayout />}>
          {/* 루트 경로('/')에 RootRedirect 컴포넌트를 연결 */}
          <Route path={PATH.LANDING} element={<RootRedirect />} />
          <Route path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.REGISTER} element={<RegisterPage />} />
          <Route path={PATH.SPACE} element={<SpacePage />} />
        </Route>

        {/* 플랜 페이지는 전체 뷰포트 사용 */}
        <Route element={<FullBleedLayout />}>
          <Route path={PATH.PLAN} element={<PlanPage />} />
        </Route>
      </Routes>
    </>
  );
}

function MobileLayout() {
  return (
    <MobileRect>
      <Outlet />
    </MobileRect>
  );
}

function FullBleedLayout() {
  return (
    <FullBleed>
      <Outlet />
    </FullBleed>
  );
}

const MobileRect = styled.div`
  margin: auto;
  max-width: 768px;
  min-height: 100vh;
  width: 100%;
  background-color: white;
`;

const FullBleed = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: white;
`;

export default Router;
