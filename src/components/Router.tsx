import HomePage from '@pages/home/HomePage';
import LandingPage from '@pages/landing/LandingPage';
import LoginPage from '@pages/login/LoginPage';
import PlanPage from '@pages/plan/PlanPage';
import RegisterPage from '@pages/register/RegisterPage';
import SpacePage from '@pages/space/SpacePage';
import RoutingPanel from '@components/RoutingPanel';
import { PATH } from '@utils/path';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ColorPanel from './ColorPanel';
import FontPanel from './FontPanel';
import { ToastContainer } from 'react-toastify';
import WayPointPage from '@/pages/plan/subpages/WayPointPage';
import TravelerPage from '@/pages/plan/subpages/TravelerPage';
import MapPage from '@/pages/plan/subpages/MapPage';
import MemoPage from '@/pages/plan/subpages/MemoPage';
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
        <Route path={PATH.PLAN.BASE} element={<PlanPage />}>
          <Route path={PATH.PLAN.WAYPOINT} element={<WayPointPage />} />
          <Route path={PATH.PLAN.TRAVELER} element={<TravelerPage />} />
          <Route path={PATH.PLAN.MAP} element={<MapPage />} />
          <Route path={PATH.PLAN.MEMO} element={<MemoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

