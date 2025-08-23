import HomePage from '@pages/home/HomePage';
import LandingPage from '@pages/landing/LandingPage';
import LoginPage from '@pages/login/LoginPage';
import PlanPage from '@pages/plan/PlanPage';
import RegisterPage from '@pages/register/RegisterPage';
import SpacePage from '@pages/space/SpacePage';
import RoutingPanel from '@components/RoutingPanel';
import { PATH } from '@utils/path';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ColorPanel from './ColorPanel';

function Router() {
  return (
    <BrowserRouter>
      <ColorPanel />
      <RoutingPanel />
      <Routes>
        <Route path={PATH.LANDING} element={<LandingPage />} />
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
