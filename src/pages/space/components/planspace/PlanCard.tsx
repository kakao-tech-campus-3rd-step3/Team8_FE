import styled from 'styled-components';
import type { PlanType } from '@/pages/space/types/plan';
import { fontSystem } from '@/styles/fontSystem';
import Edit from '@/assets/icons/Edit';
import { usePageRouting } from '@/hooks/usePageRouting';

function PlanCard({ plan, highlight = false }: { plan: PlanType; highlight?: boolean }) {
  const goto = usePageRouting();

  return (
    <PlanCardWrapper highlight={highlight}>
      <HorizontalLayout>
        <PlanInfo>
          <PlanTitle>{plan.title}</PlanTitle>
          <PlanDescription>{plan.description}</PlanDescription>
          <PlanDate>
            {plan.startDate} ~ {plan.endDate}
          </PlanDate>
        </PlanInfo>
        <EditButton onClick={goto.plan}>
          <Edit />
        </EditButton>
      </HorizontalLayout>
    </PlanCardWrapper>
  );
}

const EditButton = styled.button`
  height: 100%;

  background-color: transparent;
  border: none;

  cursor: pointer;
`;

const HorizontalLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlanTitle = styled.div`
  ${fontSystem.title.large}
`;

const PlanDescription = styled.div`
  margin-left: 20px;
  ${fontSystem.body.medium}
`;

const PlanDate = styled.div`
  margin-left: 20px;
  ${fontSystem.body.medium}
`;

const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const PlanCardWrapper = styled.div<{ highlight: boolean }>`
  padding: 24px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 16px;
  box-shadow: 0 2px 12px
    ${({ highlight }) => (highlight ? `rgba(75, 206, 93, 0.3);` : `rgba(0, 0, 0, 0.08);`)};
`;
export default PlanCard;
