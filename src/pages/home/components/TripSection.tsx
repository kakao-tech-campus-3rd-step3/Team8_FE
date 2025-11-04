import styled from 'styled-components';
import { colorSystem } from '../../../styles/colorSystem';
import { fontSystem } from '../../../styles/fontSystem';

const placeholderImages = {
  airplaneIcon: '✈️',
};

export interface Plan {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
export interface Member {
  id: number;
  email: string;
  name: string;
  contact: string;
  mbti: string;
}

interface TripSectionProps {
  member: Member | null;
  plans: Plan[];
  isLoading?: boolean;
}

export function TripSection({ member, plans, isLoading }: TripSectionProps) {
  return (
    <>
      <WelcomeMessage>
        {placeholderImages.airplaneIcon} {member ? `${member.name}님 안녕하세요` : '로딩 중...'}
      </WelcomeMessage>

      {isLoading || !member ? (
        <LoadingArea>로딩 중...</LoadingArea>
      ) : plans.length === 0 ? (
        <EmptyArea>플랜이 없습니다</EmptyArea>
      ) : (
        <TripList>
          {plans.map((plan) => (
            <TripCard key={plan.id}>
              <CardTitle>{plan.title}</CardTitle>
              <CardBody>
                <ul>
                  <li>{plan.description}</li>
                  <li>
                    {plan.startDate} ~ {plan.endDate}
                  </li>
                </ul>
              </CardBody>
            </TripCard>
          ))}
        </TripList>
      )}
    </>
  );
}

// --- Styled Components ---

const WelcomeMessage = styled.p`
  ${fontSystem.title.medium};
  padding: 24px;
  text-align: center;
`;

const TripList = styled.section`
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 656px; /* 200*3 + 16*2 + padding(12*2) = 656 */
  justify-content: flex-start;
  margin: 0 auto 32px; /* 중앙 정렬 */
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding: 12px 12px 16px;
  background-color: ${colorSystem.tertiary_white._50};
  border-radius: 12px;
`;

const LoadingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  color: ${colorSystem.tertiary_white._500};
  border: 1px dashed ${colorSystem.tertiary_white._200};
  border-radius: 8px;
  margin-bottom: 32px;
`;

const EmptyArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  color: ${colorSystem.tertiary_white._500};
  border: 1px dashed ${colorSystem.tertiary_white._200};
  border-radius: 8px;
  margin-bottom: 32px;
`;

const TripCard = styled.div`
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 8px;
  width: 200px;
  height: 200px; /* 세로 여유를 조금 줄임 */
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  scroll-snap-align: start;
  background-color: ${colorSystem.tertiary_white._0};
`;

const CardTitle = styled.h3`
  ${fontSystem.body.medium};
  padding: 12px; /* 상하 패딩 축소 */
  border-bottom: 1px solid ${colorSystem.tertiary_white._100};
  margin: 0;
  font-weight: bold;
`;

const CardBody = styled.div`
  padding: 12px; /* 상하 패딩 축소 */
  ul {
    list-style-type: none;
    padding-left: 0;
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
