import styled from 'styled-components';
import type { PlanType } from '@/pages/space/types/plan';
import PlanCard from './PlanCard';
import Add from '@/assets/icons/Add';
import NewPlanWindow from './NewPlanWindow';
import { useModal } from '@/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

const fetchPlans = async (): Promise<PlanType[]> => {
  const response = await axiosInstance.get<{ plans: PlanType[] }>(ENDPOINTS.plans.base);
  console.log('📦 fetchPlans response:', response.data);

  // ✅ 반드시 undefined가 아닌 배열을 반환해야 함
  return response.data?.plans ?? [];
};


function PlanSpace() {
  const { data: plans, isLoading, isError } = useQuery({
    queryKey: ['plans'],
    queryFn: fetchPlans,
  });

  const [newPlanWindow, openNewPlanModal] = useModal({
    ModalWindow: NewPlanWindow,
  });

  if (isLoading) return <PlanSpaceWrapper>계획 로딩 중...</PlanSpaceWrapper>;
  if (isError) return <PlanSpaceWrapper>계획을 불러오는데 실패했습니다.</PlanSpaceWrapper>;

  return (
    <PlanSpaceWrapper>
      {newPlanWindow}
      {plans?.map((plan: PlanType) => {
        return <PlanCard key={plan.id} plan={plan} />;
      })}
      <AddButton onClick={openNewPlanModal}>
        <Add />새 여행 계획하기
      </AddButton>
    </PlanSpaceWrapper>
  );
}

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(255, 192, 77, 0.3);

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