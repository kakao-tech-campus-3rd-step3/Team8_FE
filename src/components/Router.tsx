import HomePage from '@pages/home/HomePage';
import LandingPage from '@pages/landing/LandingPage';
import LoginPage from '@pages/login/LoginPage';
import PlanPage from '@pages/plan/PlanPage';
import RegisterPage from '@pages/register/RegisterPage';
import SpacePage from '@pages/space/SpacePage';
import RoutingPanel from '@components/RoutingPanel';
import { PATH } from '@utils/path';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ColorPanel from './ColorPanel';
import FontPanel from './FontPanel';
import { ToastContainer } from 'react-toastify';
import WayPointPage from '@/pages/plan/subpages/WayPointPage';
import TravelerPage from '@/pages/plan/subpages/TravelerPage';
import MapPage from '@/pages/plan/subpages/MapPage';
import MemoPage from '@/pages/plan/subpages/MemoPage';
import { useEffect } from 'react';

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit');
    if (isFirstVisit === null) {
      localStorage.setItem('isFirstVisit', 'false');
      navigate(PATH.LANDING);
    } else {
      navigate(PATH.HOME);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path={PATH.LANDING} element={<LandingPage />} />
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
  );
}

function Router() {
  return (
    <BrowserRouter>
      <RoutingPanel />
      <ColorPanel />
      <FontPanel />
      <ToastContainer />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default Router;