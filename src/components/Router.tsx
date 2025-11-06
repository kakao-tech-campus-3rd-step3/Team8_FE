import HomePage from '@pages/home/HomePage';
import LandingPage from '@pages/landing/LandingPage';
import LoginPage from '@pages/login/LoginPage';
import PlanPage from '@pages/plan/PlanPage';
import RegisterPage from '@pages/register/RegisterPage';
import SpacePage from '@pages/space/SpacePage';
import RequireAuth from '@/components/routes/RequireAuth';
import RequireGuest from '@/components/routes/RequireGuest';
import { PATH } from '@utils/path';
import { Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import InboxPage from '@/pages/inbox/InboxPage';

function Router() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* 게스트 전용 라우트: 랜딩/로그인/회원가입 */}
        <Route element={<RequireGuest />}>
          <Route element={<MobileLayout />}>
            <Route path={PATH.LANDING} element={<LandingPage />} />
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route path={PATH.REGISTER} element={<RegisterPage />} />
          </Route>
        </Route>

        {/* 인증 전용 라우트: 홈/스페이스/플랜 */}
        <Route element={<RequireAuth />}>
          <Route element={<MobileLayout />}>
            <Route path={PATH.HOME} element={<HomePage />} />
            <Route path={PATH.SPACE} element={<SpacePage />} />
            <Route path={PATH.INBOX} element={<InboxPage />} />
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
