import HomePage from '@pages/home/HomePage';
import LandingPage from '@pages/landing/LandingPage';
import LoginPage from '@pages/login/LoginPage';
import PlanPage from '@pages/plan/PlanPage';
import RegisterPage from '@pages/register/RegisterPage';
import SpacePage from '@pages/space/SpacePage';
import RoutingPanel from '@/components/dev/RoutingPanel';
import { PATH } from '@utils/path';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
    <BrowserRouter>
      <RoutingPanel />
      <ColorPanel />
      <FontPanel />
      <ToastContainer />
      <Routes>
        {/* 루트 경로('/')에 RootRedirect 컴포넌트를 연결 */}
        <Route path={PATH.LANDING} element={<RootRedirect />} />

        <Route path={PATH.HOME} element={<HomePage />} />
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.REGISTER} element={<RegisterPage />} />
        <Route path={PATH.SPACE} element={<SpacePage />} />
        <Route path={PATH.PLAN} element={<PlanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
