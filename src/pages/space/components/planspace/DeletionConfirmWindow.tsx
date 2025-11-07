import type { ModalPropType } from '@/hooks/useModal';
import Close from '@/assets/icons/Close';
import { styled } from 'styled-components';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import type { Plan } from '../../types/plan';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { toast } from 'react-toastify';

const deletePlanApi = async (planId: number) => {
  const response = await axiosInstance.delete(ENDPOINTS.plans.byId(planId));
  return response.data;
};

function DeletionConfirmWindow({ closeModal, plan }: ModalPropType & { plan: Plan }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePlanApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      closeModal();
    },
    onError: () => {
      toast.error('삭제에 실패했습니다.');
    },
  });

  const handleDelete = () => {
    mutation.mutate(plan.id);
  };

  return (
    <ModalWindowWrapper>
      <WindowTopBar>
        <WindowTitle>이 계획을 삭제할까요?</WindowTitle>
        <CloseButton onClick={closeModal}>
          <Close />
        </CloseButton>
      </WindowTopBar>

      <PlanWrapper>
        <PlanTitle>{plan.title}</PlanTitle>
        <PlanDescription>{plan.description}</PlanDescription>
        <PlanDescription>
          {plan.startDate}~{plan.endDate}
        </PlanDescription>
      </PlanWrapper>

      <ControlBar>
        <DeleteButton onClick={handleDelete} disabled={mutation.isPending}>
          {mutation.isPending ? '삭제 중...' : '삭제'}
        </DeleteButton>
        <CancelButton onClick={closeModal}>취소</CancelButton>
      </ControlBar>
    </ModalWindowWrapper>
  );
}

const PlanWrapper = styled.div`
  border: 1px solid ${colorSystem.tertiary_white._900};
  border-radius: 8px;
  padding: 16px;
`;

const PlanTitle = styled.div`
  ${fontSystem.title.large}
`;

const PlanDescription = styled.div`
  ${fontSystem.body.medium}
`;

const WindowTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WindowTitle = styled.div`
  ${fontSystem.title.medium}
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ModalWindowWrapper = styled.div`
  background-color: ${colorSystem.tertiary_white._0};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ControlBar = styled.div`
  display: flex;
  gap: 8px;
  min-width: 300px;
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${colorSystem.primary_yellow._500};
  background-color: red;
  color: white;

  transition: all 0.25s;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const CancelButton = styled.button`
  flex: 2;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${colorSystem.tertiary_white._900};
  background-color: ${colorSystem.tertiary_white._0};
  cursor: pointer;
`;

export default DeletionConfirmWindow;
