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
  member: Member
  plans: Plan[];
}

export function TripSection({ member, plans }: TripSectionProps) {
  return (
    <>
      <WelcomeMessage>
        {placeholderImages.airplaneIcon} {member.name}님 안녕하세요
      </WelcomeMessage>

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
  font-weight: bold;
`;

const CardBody = styled.div`
  padding: 16px;
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