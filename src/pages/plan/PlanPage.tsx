import { fontSystem } from '@/styles/fontSystem';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import InvitationPanel from './components/InvitationPanel';
import ExportModal from './components/ExportModal';
import { useEffect, useState } from 'react';
import { colorSystem } from '@/styles/colorSystem';
import Canvas from './flow/Canvas';

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

  return (
    <>
      <InvitationPanel />
      <TitleBar>
        <Title>일본여행</Title>
        <Description>OOO과 함께하는 일본 여행</Description>
        <ExportButton onClick={handleExportClick}>PDF로 내보내기</ExportButton>
      </TitleBar>
      {isExportModalOpen && <ExportModal onClose={handleCloseModal} title="일본여행" />}
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
