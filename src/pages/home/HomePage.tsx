import styled from 'styled-components';
import { colorSystem } from '../../styles/colorSystem';
import { Banner } from './components/Banner';
import { NavLinks } from './components/NavLinks';
import { TripSection } from './components/TripSection';

const placeholderImages = {
  logo: '/logo.svg',
};

function HomePage() {
  const userName = '안선우';
  const trips = [
    { location: '장소', period: '기간', member: '멤버' },
    { location: '장소', period: '기간', member: '멤버' },
    { location: '장소', period: '기간', member: '멤버' },
  ];

  return (
    <PageWrapper>
      <Header>
        <Logo src={placeholderImages.logo} alt="Journey Planner Logo" />
      </Header>
      <MainContent>
        <Banner />
        <TripSection userName={userName} trips={trips} />
        <NavLinks />
      </MainContent>
      <Footer>
        <Logo src={placeholderImages.logo} alt="Journey Planner Logo" />
      </Footer>
    </PageWrapper>
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

export default HomePage;