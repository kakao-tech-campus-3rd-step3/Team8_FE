import TopBar from '@/components/TopBar';
import Profile from '@/pages/space/components/profile/Profile';
import PlanSpace from '@/pages/space/components/planspace/PlanSpace';
import styled from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { useQueryClient } from '@tanstack/react-query';
import { colorSystem } from '@/styles/colorSystem';

function SpacePage() {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

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
      <TopBarContainer>
        <TopBar>나의 스페이스</TopBar>
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
      </TopBarContainer>
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
`;

const TopBarContainer = styled.div`
  position: relative;
`;

const LogoutButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.tertiary_white._200};
  background: ${colorSystem.tertiary_white._0};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: ${colorSystem.tertiary_white._500};
  margin-right: 24px;
`;

export default SpacePage;
