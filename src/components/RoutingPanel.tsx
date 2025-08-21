import { usePageRouting } from '@hooks/usePageRouting';
import styled from 'styled-components';

function RoutingPanel() {
  const goto = usePageRouting();

  return (
    <RoutingPanelWrapper>
      <div>라우팅 패널</div>
      <Button onClick={goto.landing}>랜딩</Button>
      <Button onClick={goto.home}>홈</Button>
      <Button onClick={goto.login}>로그인</Button>
      <Button onClick={goto.register}>회원가입</Button>
      <Button onClick={goto.space}>스페이스</Button>
      <Button onClick={goto.plan}>계획</Button>
    </RoutingPanelWrapper>
  );
}

const Button = styled.button`
  min-width: 50px;
  padding: 4px;
`;

const RoutingPanelWrapper = styled.div`
  bottom: 64px;
  right: 64px;
  position: absolute;
  border: 1px solid black;
  padding: 16px;
  border-radius: 8px;
  width: fit-content;
  opacity: 0.5;
  box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
`;

export default RoutingPanel;
