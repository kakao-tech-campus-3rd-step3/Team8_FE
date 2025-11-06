import styled from 'styled-components';
import type { Plan } from '@/pages/space/types/plan';
import PlanCard from './PlanCard';
import Add from '@/assets/icons/Add';
import NewPlanWindow from './NewPlanWindow';
import { useModal } from '@/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { useEffect } from 'react';
import { toastApiError } from '@/utils/apiError';
import { colorSystem } from '@/styles/colorSystem';

// API 응답 데이터 타입 정의
interface PlansResponse {
  content: Plan[];
}

const fetchPlans = async (): Promise<Plan[]> => {
  // API 응답 구조에 맞게 response.data.content를 사용하도록 수정합니다.
  const response = await axiosInstance.get<PlansResponse>(ENDPOINTS.plans.base);
  return response.data.content ?? [];
};

function PlanSpace() {
  const {
    data: plans,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['plans'],
    queryFn: fetchPlans,
  });

  useEffect(() => {
    if (isError) toastApiError(error);
  }, [isError, error]);

  const [newPlanWindow, openNewPlanModal] = useModal({
    ModalWindow: NewPlanWindow,
  });

  if (isLoading) return <PlanSpaceWrapper>계획 로딩 중...</PlanSpaceWrapper>;
  if (isError) return <PlanSpaceWrapper>계획을 불러오는데 실패했습니다.</PlanSpaceWrapper>;

  const latestPlanId = plans && plans.length > 0 ? Math.max(...plans.map((p) => p.id)) : null;

  return (
    <PlanSpaceWrapper>
      {newPlanWindow}
      <AddButton onClick={openNewPlanModal}>
        <Add />새 여행 계획하기
      </AddButton>
      {plans?.map((plan: Plan) => {
        // 현재 plan이 최신 plan이면 highlight를 true로 설정합니다.
        return <PlanCard key={plan.id} plan={plan} highlight={plan.id === latestPlanId} />;
      })}
    </PlanSpaceWrapper>
  );
}

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 30px;
  border: 2px dashed ${colorSystem.tertiary_white._200};
  cursor: pointer;
`;

const PlanSpaceWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

export default PlanSpace;
