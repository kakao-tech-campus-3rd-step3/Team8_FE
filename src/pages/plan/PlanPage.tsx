import { fontSystem } from '@/styles/fontSystem';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import InvitationPanel from './components/InvitationPanel'; // 컴포넌트 import

function PlanPage() {
  const id = useParams().id ?? '-1';
  return (
    <>
      <InvitationPanel /> {/* 추가된 UI 컴포넌트 */}
      <TitleBar>
        <Title>일본여행</Title>
        <Description>OOO과 함께하는 일본 여행</Description>
      </TitleBar>
    </>
  );
}

const Title = styled.div`
  ${fontSystem.title.xxlarge}
  margin-right: 8px;
`;

const Description = styled.div`
  ${fontSystem.body.large}
`;

const TitleBar = styled.div`
  padding: 16px;
  display: flex;

  align-items: baseline;
  flex-wrap: wrap;
`;

export default PlanPage;
