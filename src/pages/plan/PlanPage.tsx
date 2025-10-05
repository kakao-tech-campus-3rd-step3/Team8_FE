import { fontSystem } from '@/styles/fontSystem';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import InvitationPanel from './components/InvitationPanel';
import ExportModal from './components/ExportModal';
import { useEffect, useState } from 'react';
import { colorSystem } from '@/styles/colorSystem';
import Canvas from './flow/Canvas';
import useSocketHandler from './hooks/useSocketHandler';

function PlanPage() {
  const id = useParams().id ?? '-1';

  useEffect(() => {
    console.log(`백엔드 plan 정보 요청 (${id})`);
  }, [id]);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsExportModalOpen(false);
  };

  const { client } = useSocketHandler({ planId: parseInt(id) });

  return (
    <>
      <>
        <button
          onClick={() => {
            client.publish({
              destination: `/app/plans/${id}/waypoints/init`,
            });
            console.log('초기 데이터 요청 완료');
          }}
        >
          Publish init
        </button>
        <button
          onClick={() => {
            const newWaypoint = {
              name: '새로운 경유지',
              description: '경유지에 대한 설명입니다.',
              address: '대구광역시 중구 동성로 1',
              startTime: new Date().toISOString(),
              endTime: new Date(Date.now() + 3600 * 1000).toISOString(),
              locationCategory: 'FOOD',
              locationSubCategory: 'CAFE',
              xPosition: 0,
              yPosition: 0,
            };

            client.publish({
              destination: `/app/plans/${id}/waypoints/create`,
              body: JSON.stringify(newWaypoint),
            });

            console.log('Create 요청 메시지 발행 완료:', newWaypoint);
          }}
        >
          Publish Create
        </button>
      </>
      <InvitationPanel />
      <TitleBar>
        <Title>일본여행</Title>
        <Description>OOO과 함께하는 일본 여행</Description>
        <ExportButton onClick={handleExportClick}>내보내기</ExportButton>
      </TitleBar>
      {isExportModalOpen && <ExportModal onClose={handleCloseModal} />}
      <Canvas />
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

const ExportButton = styled.button`
  margin-left: auto;
  padding: 8px 16px;
  background-color: ${colorSystem.primary_yellow._400};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${fontSystem.body.medium}
  &:hover {
    background-color: ${colorSystem.primary_yellow._500};
  }
`;

export default PlanPage;
