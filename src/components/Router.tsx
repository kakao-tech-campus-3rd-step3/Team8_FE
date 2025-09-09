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

function RootRedirect() {
  const isFirstVisit = localStorage.getItem('isFirstVisit');

  if (isFirstVisit === null) {
    // 첫 방문이면 localStorage에 기록하고 LandingPage 렌더링
    localStorage.setItem('isFirstVisit', 'false');
    return <LandingPage />;
  } else {
    // 재방문이면 HomePage로 리다이렉트
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
        {/* 2. 루트 경로('/')에 RootRedirect 컴포넌트를 연결 */}
        <Route path={PATH.LANDING} element={<RootRedirect />} />
        
        {/* 나머지 라우트는 그대로 유지 */}
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