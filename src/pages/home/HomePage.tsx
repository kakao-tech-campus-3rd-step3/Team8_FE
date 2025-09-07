import styled from 'styled-components';
import { colorSystem } from '../../styles/colorSystem';
import { Banner } from './components/Banner';
import { NavLinks } from './components/NavLinks';
import { TripSection, type Plan, type Member } from './components/TripSection'; // Member 타입도 가져옵니다.
import { useState, useEffect } from 'react'; // useState와 useEffect를 import 합니다.

const placeholderImages = {
  logo: '/logo.svg',
};

// 임시 API 응답 데이터
const mockMemberResponse = {
  status: 200,
  message: '내 정보를 불러왔습니다.',
  member: {
    id: 1,
    email: 'user@example.com',
    name: '안선우',
    contact: '010-1234-5678',
    mbti: 'INFP',
  },
};

const mockPlans: Plan[] = [
  { id: 1, title: '부산 여름 휴가', description: '친구들과 함께!', startDate: '2024-08-15', endDate: '2024-08-18' },
  { id: 2, title: '제주도 가족 여행', description: '가족과 힐링', startDate: '2024-09-10', endDate: '2024-09-14' },
  { id: 3, title: '나 홀로 강릉 여행', description: '생각 정리하기', startDate: '2024-10-05', endDate: '2024-10-06' },
];

function HomePage() {
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    // 실제로는 여기서 fetch나 axios를 사용해 API를 호출합니다.
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