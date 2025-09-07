import { usePageRouting } from '@/hooks/usePageRouting';
import { fontSystem } from '@/styles/fontSystem';
import { Outlet, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

function PlanPage() {
  const goto = usePageRouting();
  const id = useParams().id ?? '-1';
  return (
    <>
      <TitleBar>
        <Title>일본여행</Title>
        <Description>OOO과 함께하는 일본 여행</Description>
      </TitleBar>
      <button onClick={goto.plan.base(id).waypoint}>웨이포인트 관리</button>
      <button onClick={goto.plan.base(id).traveler}>여행자 관리</button>
      <button onClick={goto.plan.base(id).map}>지도</button>
      <button onClick={goto.plan.base(id).memo}>메모</button>
      <div>
        <Outlet />
      </div>
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
