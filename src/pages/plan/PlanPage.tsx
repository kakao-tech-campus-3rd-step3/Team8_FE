import { fontSystem } from '@/styles/fontSystem';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import InvitationPanel from './components/InvitationPanel';
import ExportModal from './components/ExportModal';
import { useState } from 'react';
import { colorSystem } from '@/styles/colorSystem';
import Canvas from './flow/Canvas';
import { SocketProvider } from './context/SocketContext';
import { useFetchPlanDetail } from './hooks/useFetchPlanDetail';
import { usePageRouting } from '@/hooks/usePageRouting';
import { toast } from 'react-toastify';

function PlanPage() {
  const id = useParams().id ?? '-1';

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const handleExportClick = () => setIsExportModalOpen(true);
  const handleCloseModal = () => setIsExportModalOpen(false);

  const { data, isSuccess, isError } = useFetchPlanDetail(id);
  const goto = usePageRouting();

  if (isError) {
    toast.error('해당 계획에 접근할 수 없습니다.');
    goto.back();
    return null;
  }

  return (
    <SocketProvider planId={parseInt(id)}>
      <InvitationPanel />
      <TitleBar>
        <Title>{isSuccess ? data.title : '계획을 불러오고 있습니다...'}</Title>
        <Description>{isSuccess ? data.description : '...'}</Description>
        <ExportButton onClick={handleExportClick}>PDF로 내보내기</ExportButton>
        <BackButton onClick={() => goto.back()}>뒤로가기</BackButton>
      </TitleBar>
      {isExportModalOpen && <ExportModal onClose={handleCloseModal} />}
      <Canvas />
    </SocketProvider>
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

const BackButton = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  background-color: ${colorSystem.secondary_green._400};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${fontSystem.body.medium}
  &:hover {
    background-color: ${colorSystem.secondary_green._500};
  }
`;

export default PlanPage;
