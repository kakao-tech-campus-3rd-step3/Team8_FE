import styled from 'styled-components';
import { colorSystem } from '../../styles/colorSystem';
import { Banner } from './components/Banner';
import { NavLinks } from './components/NavLinks';
import { TripSection, type Member } from './components/TripSection';
import { useMemo, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMemberQuery } from '@/pages/home/hooks/useMemberQuery';
import { usePlansForHome } from '@/pages/home/hooks/usePlansQuery';
import Spinner, { SectionSpinner } from '@/components/Spinner';
import ErrorBoundary from '@/components/ErrorBoundary';

const placeholderImages = {
  logo: '/logo.svg',
};

function HomePage() {
  const { logout } = useAuth();

  return (
    <PageWrapper>
      <Header>
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
        <Logo src={placeholderImages.logo} alt="Journey Planner Logo" />
      </Header>
      <HomeContent />
      <Footer>
        <Logo src={placeholderImages.logo} alt="Journey Planner Logo" />
      </Footer>
    </PageWrapper>
  );
}

function HomeContent() {
  return (
    <MainContent>
      <Banner />
      {/* TripSection 영역만 Suspense로 감싸 부분 로딩 처리 */}
      <Suspense fallback={<TripSectionFallback />}> 
        <HomeTripsBlock />
      </Suspense>
      <NavLinks />
    </MainContent>
  );
}

function HomeTripsBlock() {
  const { data: me } = useMemberQuery();
  const { data: plans = [] } = usePlansForHome({ page: 0, size: 10 });

  const member: Member | null = useMemo(() => {
    if (!me) return null;
    return {
      id: 0,
      email: me.email,
      name: me.username,
      contact: me.contact,
      mbti: me.mbti,
    };
  }, [me]);

  return (
    <ErrorBoundary fallback={null}>
      <TripSection member={member} plans={plans} isLoading={false} />
    </ErrorBoundary>
  );
}

function TripSectionFallback() {
  return (
    <div style={{ width: '100%' }}>
      {/* 인사말 자리 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <span style={{ marginRight: 8 }}>✈️</span>
        <Spinner size={16} />
      </div>
      {/* 플랜 카드 자리 */}
      <SectionSpinner />
    </div>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colorSystem.tertiary_white._0};
  padding: 0 24px;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${colorSystem.tertiary_white._100};
  display: flex;
  justify-content: center;
  position: relative;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;

const LogoutButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.tertiary_white._200};
  background: ${colorSystem.tertiary_white._0};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: ${colorSystem.tertiary_white._500};
`;

export default HomePage;
