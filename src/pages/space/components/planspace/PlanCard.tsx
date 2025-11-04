import styled from 'styled-components';
import type { Plan } from '@/pages/space/types/plan';
import { fontSystem } from '@/styles/fontSystem';
import Edit from '@/assets/icons/Edit';
import { usePageRouting } from '@/hooks/usePageRouting';
import Delete from '@/assets/icons/Delete';
import DeletionConfirmWindow from './DeletionConfirmWindow';
import { useModal } from '@/hooks/useModal';
import { colorSystem } from '@/styles/colorSystem';

function PlanCard({ plan, highlight = false }: { plan: Plan; highlight?: boolean }) {
  const goto = usePageRouting();
  const [deletionConfirmModal, openDeletionConfirmWindow] = useModal({
    ModalWindow: DeletionConfirmWindow,
    modalProps: { plan },
  });
  return (
    <PlanCardWrapper highlight={highlight}>
      {deletionConfirmModal}
      <HorizontalLayout>
        <PlanInfo>
          <PlanTitle>{plan.title}</PlanTitle>
          <PlanDescription>{plan.description}</PlanDescription>
          <PlanDate>
            {plan.startDate} ~ {plan.endDate}
          </PlanDate>
        </PlanInfo>
        <ControlPanel>
          <EditButton onClick={goto.plan(`${plan.id}`)}>
            <Edit />
          </EditButton>
          <DeleteButton onClick={openDeletionConfirmWindow}>
            <Delete />
          </DeleteButton>
        </ControlPanel>
      </HorizontalLayout>
    </PlanCardWrapper>
  );
}

const ControlPanel = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

const DeleteButton = styled.button`
  height: 100%;

  background-color: transparent;
  border: none;

  cursor: pointer;
`;

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

const PlanCardWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'highlight',
})<{ highlight: boolean }>`
  padding: 24px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 40px;
  /* 상단(하이라이트) 카드: 초록색 선, 나머지: 회색 선 */
  border: 1px solid
    ${({ highlight }) =>
      highlight ? colorSystem.secondary_green._400 : colorSystem.tertiary_white._200};
  /* 프로필 섹션과 동일한 그림자 적용 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;
export default PlanCard;
