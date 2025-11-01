import styled from 'styled-components';
import {
  CancelButton,
  CloseButton,
  ControlBar,
  ModalWindowWrapper,
  WindowTitle,
  WindowTopBar,
} from '@/pages/space/styles/modalWindowStyle';
import Close from '@/assets/icons/Close';
import PDFSave from '../pdf/PDFSave';

type ExportModalProps = {
  onClose: () => void;
};

function ExportModal({ onClose }: ExportModalProps) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalWindowWrapper onClick={(e) => e.stopPropagation()}>
        <WindowTopBar>
          <WindowTitle>PDF 내보내기</WindowTitle>
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </WindowTopBar>
        <ControlBar>
          <SmallCancelButton onClick={onClose}>취소</SmallCancelButton>
          <PDFSave />
        </ControlBar>
      </ModalWindowWrapper>
    </ModalOverlay>
  );
}

export default ExportModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const SmallCancelButton = styled(CancelButton)`
  padding: 12px;
`;
