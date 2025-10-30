import HomePage from '@pages/home/HomePage';
import LandingPage from '@pages/landing/LandingPage';
import LoginPage from '@pages/login/LoginPage';
import PlanPage from '@pages/plan/PlanPage';
import RegisterPage from '@pages/register/RegisterPage';
import SpacePage from '@pages/space/SpacePage';
import RoutingPanel from '@/components/dev/RoutingPanel';
import RequireAuth from '@/components/routes/RequireAuth';
import RequireGuest from '@/components/routes/RequireGuest';
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
        {/* 퍼블릭 라우트 */}
        <Route element={<MobileLayout />}>
          {/* 루트 경로('/')에 RootRedirect 컴포넌트를 연결 */}
          <Route path={PATH.LANDING} element={<RootRedirect />} />
          {/* 홈은 인증/게스트 무관하게 접근 가능 */}
          <Route path={PATH.HOME} element={<HomePage />} />
        </Route>

        {/* 게스트 전용 라우트 */}
        <Route element={<RequireGuest />}>
          <Route element={<MobileLayout />}>
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route path={PATH.REGISTER} element={<RegisterPage />} />
          </Route>
        </Route>

        {/* 인증 전용 라우트 */}
        <Route element={<RequireAuth />}>
          <Route element={<MobileLayout />}>
            <Route path={PATH.SPACE} element={<SpacePage />} />
          </Route>

          {/* 플랜 페이지는 전체 뷰포트 사용 */}
          <Route element={<FullBleedLayout />}>
            <Route path={PATH.PLAN} element={<PlanPage />} />
          </Route>
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
