import styled from 'styled-components';
import { colorSystem } from '../../../styles/colorSystem';
import { fontSystem } from '../../../styles/fontSystem';

const placeholderImages = {
  airplaneIcon: '✈️',
};

// HomePage로부터 props를 통해 데이터를 전달받도록 인터페이스를 정의합니다.
interface Trip {
  location: string;
  period: string;
  member: string;
}

interface TripSectionProps {
  userName: string;
  trips: Trip[];
}

export function TripSection({ userName, trips }: TripSectionProps) {
  return (
    <>
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
    </>
  );
}

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
    @media (max-width: 768px) {
      ${fontSystem.body.small};
    }
  }
  li {
    margin-bottom: 8px;
  }
`;