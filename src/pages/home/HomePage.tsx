import styled from 'styled-components';
import { colorSystem } from '../../styles/colorSystem';
import { Banner } from './components/Banner';
import { NavLinks } from './components/NavLinks';
import { TripSection, type Member } from './components/TripSection';
import { useState, useEffect } from 'react';
import { mockMemberResponse, mockPlans } from '../../mocks/data'; 

const placeholderImages = {
  logo: '/logo.svg',
};

function HomePage() {
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    // 여기서 fetch나 axios를 사용해 API 호출
    setMember(mockMemberResponse.member);
  }, []);

  if (!member) {
    return <div>로딩 중...</div>;
  }

  return (
    <PageWrapper>
      <Header>
        <Logo src={placeholderImages.logo} alt="Journey Planner Logo" />
      </Header>
      <MainContent>
        <Banner />
        <TripSection member={member} plans={mockPlans} />
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