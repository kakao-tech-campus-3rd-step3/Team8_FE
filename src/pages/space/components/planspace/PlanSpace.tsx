import styled from 'styled-components';
import type { PlanType } from '@/pages/space/types/plan';

const dummyPlanResponse = {
  status: 200,
  plans: [
    {
      id: 1234,
      title: '일본 여행',
      description: '친구과 함께 하는 일본 여행',
      startDate: '2025-01-01',
      endDate: '2025-01-05',
    } as PlanType,
  ],
};

function PlanSpace() {
  return <PlanSpaceWrapper></PlanSpaceWrapper>;
}

const PlanSpaceWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

export default PlanSpace;
