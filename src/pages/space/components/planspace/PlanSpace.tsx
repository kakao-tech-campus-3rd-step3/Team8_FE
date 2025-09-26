import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import type { PlanType } from '@/pages/space/types/plan';
import type { MemberType } from '@/types/member';
import PlanCard from './PlanCard';
import Add from '@/assets/icons/Add';
import NewPlanWindow from './NewPlanWindow';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';

const fetchMemberInfo = async (): Promise<MemberType> => {
  const response = await axiosInstance.get('/v1/plans');
  return response.data;
};

const fetchPlansByMemberId = async (memberId: number | undefined): Promise<PlanType[]> => {
  if (!memberId) {
    return [];
  }
  const response = await axiosInstance.get(`/v1/plans`, { params: { memberId } });
  return Array.isArray(response.data) ? response.data : [];
};

function PlanSpace() {
  const { user } = useAuth(); 

  const { data: member, isLoading: isMemberLoading } = useQuery<MemberType>({
    queryKey: ['memberInfo'],
    queryFn: fetchMemberInfo,
    enabled: !user,
  });

  const currentMember = user || member;

  const {
    data: plans,
    isLoading: arePlansLoading,
    isError,
  } = useQuery<PlanType[]>({
    queryKey: ['plans', currentMember?.id],
    queryFn: () => fetchPlansByMemberId(currentMember?.id),
    enabled: !!currentMember,
  });

  const [newPlanWindow, openNewPlanModal] = useModal({
    ModalWindow: NewPlanWindow,
  });
  
  if (isMemberLoading || arePlansLoading) {
    return <PlanSpaceWrapper><p>여행 계획을 불러오는 중입니다...</p></PlanSpaceWrapper>;
  }

  if (isError) {
      return <PlanSpaceWrapper><p>오류가 발생했습니다.</p></PlanSpaceWrapper>;
  }


  return (
    <PlanSpaceWrapper>
      {newPlanWindow}
      {plans && plans.length > 0 ? (
        plans.map((plan: PlanType) => <PlanCard key={plan.id} plan={plan} />)
      ) : (
        <p>아직 생성된 여행 계획이 없습니다.</p>
      )}
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

