import { usePageRouting } from '@hooks/usePageRouting';
import styled from 'styled-components';

function RoutingPanel() {
  const goto = usePageRouting();

  return (
    <RoutingPanelWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2>라우팅 패널</h2>
        <Button onClick={goto.landing}>랜딩</Button>
        <Button onClick={goto.home}>홈</Button>
        <Button onClick={goto.login}>로그인</Button>
        <Button onClick={goto.register}>회원가입</Button>
        <Button onClick={goto.space}>스페이스</Button>
        <Button onClick={goto.plan.base('1234').waypoint}>계획</Button>
      </div>
    </RoutingPanelWrapper>
  );
}

const Button = styled.button`
  cursor: pointer;
  min-width: 50px;
  padding: 4px;
`;

const RoutingPanelWrapper = styled.div`
  position: fixed;
  background-color: white;
  top: 40px;
  right: 0;
  transform: translateX(calc(100% - 50px));
  transition: transform 0.5s ease-out;
  border: 1px solid black;
  padding: 16px;
  border-radius: 8px;
  width: fit-content;
  box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;

  &:hover {
    transform: translateX(calc(100% - 50px - 100px));
  }
`;

export default RoutingPanel;
