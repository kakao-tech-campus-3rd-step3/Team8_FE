import TopBar from '@/components/TopBar';
import Profile from '@/pages/space/components/profile/Profile';
import PlanSpace from '@/pages/space/components/planspace/PlanSpace';
import styled from 'styled-components';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { useQueryClient } from '@tanstack/react-query';

function SpacePage() {
  const queryClient = useQueryClient();

  const expireAccessToken = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'expired-token');
      // 즉시 API 재요청을 유도하여 리프레시 로직이 수행되는지 확인합니다.
      queryClient.invalidateQueries({ queryKey: ['memberInfo'] });
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      // 개발 편의를 위해 콘솔 로그 출력
      // eslint-disable-next-line no-console
      console.log('[dev] Set expired access token and invalidated memberInfo/plans');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('토큰 만료 시뮬레이션 실패', e);
    }
  };

  return (
    <>
      <TopBar>나의 스페이스</TopBar>
      <SpacePageWrapper>
        <DevBar>
          <ExpireButton onClick={expireAccessToken}>액세스 토큰 만료 시뮬레이션</ExpireButton>
        </DevBar>
        <Profile />
        <PlanSpace />
      </SpacePageWrapper>
    </>
  );
}

const SpacePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  padding: 24px;
`;

const DevBar = styled.div`
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: flex-end;
`;

const ExpireButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ff922b;
  background: #fff4e6;
  color: #d9480f;
  cursor: pointer;
`;

export default SpacePage;
