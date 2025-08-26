import styled from 'styled-components';
import { colorSystem } from '@styles/colorSystem';
import { fontSystem } from '@styles/fontSystem';

const placeholderImages = {
  logo: '/logo.svg', // public/logo.svg 경로
  airplaneIcon: '✈️', // 아이콘으로 대체
  newTripIcon: '🗺️', // 아이콘으로 대체
  paperAirplane: 'https://i.pinimg.com/1200x/e2/6c/d7/e26cd7ead75785115a7144fdef259cef.jpg', // 임시 이미지
  windowSeat: 'https://i.pinimg.com/1200x/fd/14/47/fd1447fb3c91db32c1bc0ccbc4055a23.jpg', // 임시 이미지
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
        <Logo src={placeholderImages.logo} alt="Journey Planner Logo" text-align= "center"/>
      </Header>
      <MainContent>
        <Banner>
          <Title>
            <ColorSpan color={colorSystem.secondary_green._500}>J</ColorSpan>
            ourney
            <ColorSpan color={colorSystem.primary_yellow._400}> P</ColorSpan>
            lanner
          </Title>
          <Subtitle>나의 계획을 친구들에게 공유해보세요</Subtitle>
          <NewTripButton>
            <span>{placeholderImages.newTripIcon}</span> 새 여행 계획하기
          </NewTripButton>
        </Banner>

        <WelcomeMessage>
          {placeholderImages.airplaneIcon} {userName}님 안녕하세요
        </WelcomeMessage>

        <TripList>
          {trips.map((trip, index) => (
            <TripCard key={index}>
              <CardTitle>여행</CardTitle>
              <CardBody>
                <ul>
                  <li>장소: {trip.location}</li>
                  <li>기간: {trip.period}</li>
                  <li>멤버: {trip.member}</li>
                </ul>
              </CardBody>
            </TripCard>
          ))}
        </TripList>

        <NavLinks>
          <NavLink image={placeholderImages.paperAirplane}>
            <span>모든 개인 스페이스 보기</span>
          </NavLink>
          <NavLink image={placeholderImages.windowSeat}>
            <span>Mypage</span>
          </NavLink>
        </NavLinks>
      </MainContent>
      <Footer>
        <Logo src={placeholderImages.logo} alt="Journey Planner Logo" />
      </Footer>
    </PageWrapper>
  );
}

// Styled Components

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

const Banner = styled.section`
  text-align: center;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h1`
  ${fontSystem.title.xxxlarge};
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 0;

  /*mobile version*/
  @media (max-width: 768px) {
    ${fontSystem.title.xxlarge}; 
  }
`;

const ColorSpan = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

const Subtitle = styled.p`
  ${fontSystem.body.medium};
  color: ${colorSystem.tertiary_white._500};
  margin: 0;
`;

const NewTripButton = styled.button`
  ${fontSystem.body.medium};
  background-color: ${colorSystem.tertiary_white._0};
  border: 1px solid ${colorSystem.tertiary_white._200};
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 16px;

  &:hover {
    background-color: ${colorSystem.tertiary_white._50};
  }
`;

const WelcomeMessage = styled.p`
  ${fontSystem.title.medium};
  padding: 24px;
  text-align: center;
`;

const TripList = styled.section`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
  margin-bottom: 32px;
  
`;

const TripCard = styled.div`
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 8px;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  ${fontSystem.body.medium};
  padding: 16px;
  border-bottom: 1px solid ${colorSystem.tertiary_white._100};
  margin: 0;
`;

const CardBody = styled.div`
  padding: 16px;
  ul {
    list-style-type: '• ';
    padding-left: 16px;
    margin: 0;
    ${fontSystem.body.medium};
    color: ${colorSystem.tertiary_white._600};
      /*mobile version*/
  @media (max-width: 768px) {
    ${fontSystem.body.small}; 
  }
  }
  li {
    margin-bottom: 8px;
  }
`;

const NavLinks = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
`;

const NavLink = styled.a<{ image: string }>`
  ${fontSystem.title.large};
  height: 150px;
  border-radius: 8px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  color: ${colorSystem.tertiary_white._0};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    /*mobile version*/
  @media (max-width: 768px) {
    ${fontSystem.title.small}; 
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;

export default HomePage;