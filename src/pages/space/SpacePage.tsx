import TopBar from '@/components/TopBar';
import Profile from '@/pages/space/components/profile/Profile';
import PlanSpace from '@/pages/space/components/planspace/PlanSpace';
import styled from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import { colorSystem } from '@/styles/colorSystem';

function SpacePage() {
  const { logout } = useAuth();

  return (
    <>
      <TopBarContainer>
        <TopBar>나의 스페이스</TopBar>
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
      </TopBarContainer>
      <SpacePageWrapper>
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
