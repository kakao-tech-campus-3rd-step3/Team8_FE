import styled from 'styled-components';
import type { PlanType } from '@/pages/space/types/plan';
import PlanCard from './PlanCard';

const dummyPlanResponse = {
  status: 200,
  plans: [
    {
      id: 1234,
      title: '일본 여행',
      description: '친구와 함께 하는 일본 여행',
      startDate: '2025-01-01',
      endDate: '2025-01-05',
    } as PlanType,
    {
      id: 1235,
      title: '미국 여행',
      description: '나 혼자 하는 미국 여행',
      startDate: '2025-01-06',
      endDate: '2025-01-12',
    } as PlanType,
    {
      id: 1236,
      title: '한국 여행',
      description: '재미있는 한국 여행',
      startDate: '2025-01-14',
      endDate: '2025-01-15',
    } as PlanType,
  ],
};

function PlanSpace() {
  const plans = dummyPlanResponse.plans;
  // 가장 최근 수정한 플랜을 highlight하면 어떻까요?
  return (
    <PlanSpaceWrapper>
      {plans.map((plan: PlanType) => {
        return <PlanCard key={plan.id} plan={plan} highlight={plan.id === 1234} />;
      })}
    </PlanSpaceWrapper>
  );
}

const PlanSpaceWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

export default PlanSpace;
