import TopBar from '@/components/TopBar';
import Profile from './components/Profile';
import PlanSpace from './components/PlanSpace';
import styled from 'styled-components';

function SpacePage() {
  return (
    <>
      <TopBar>나의 스페이스</TopBar>
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

export default SpacePage;
