import { useState } from 'react';
import styled from 'styled-components';
import {
  CancelButton,
  CloseButton,
  CompleteButton,
  ControlBar,
  ModalWindowWrapper,
  WindowTitle,
  WindowTopBar,
} from '@/pages/space/styles/modalWindowStyle';
import Close from '@/assets/icons/Close';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import PDFSave from '../pdf/PDFSave';

type ExportSettingsProps = {
  onClose: () => void;
  onExport: () => void;
  isLoading: boolean;
};

function ExportSettings({ onClose, onExport, isLoading }: ExportSettingsProps) {
  return (
    <ModalWindowWrapper onClick={(e) => e.stopPropagation()}>
      <WindowTopBar>
        <WindowTitle>PDF 내보내기 설정</WindowTitle>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </WindowTopBar>
      <SettingsWrapper>
        <SettingItem>
          <label>용지 크기:</label>
          <StyledSelect>
            <option>A4</option>
            <option>Letter</option>
          </StyledSelect>
        </SettingItem>
        <SettingItem>
          <label>방향:</label>
          <StyledSelect>
            <option>세로</option>
            <option>가로</option>
          </StyledSelect>
        </SettingItem>
      </SettingsWrapper>
      <ControlBar>
        <SmallCancelButton onClick={onClose}>취소</SmallCancelButton>
        <SmallCompleteButton onClick={onExport} disabled={isLoading}>
          내보내기
        </SmallCompleteButton>
      </ControlBar>
      <PDFSave />
    </ModalWindowWrapper>
  );
}

function ExportLoading() {
  return (
    <ModalWindowWrapper>
      <p>생성중...</p>
    </ModalWindowWrapper>
  );
}

type ExportCompleteProps = {
  onClose: () => void;
};

function ExportComplete({ onClose }: ExportCompleteProps) {
  return (
    <ModalWindowWrapper>
      <p>완료되었습니다!</p>
      <SmallCancelButton onClick={onClose}>닫기</SmallCancelButton>
    </ModalWindowWrapper>
  );
}

type ExportModalProps = {
  onClose: () => void;
};

function ExportModal({ onClose }: ExportModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, 2000);
  };

  return (
    <ModalOverlay onClick={onClose}>
      {isComplete ? (
        <ExportComplete onClose={onClose} />
      ) : isLoading ? (
        <ExportLoading />
      ) : (
        <ExportSettings onClose={onClose} onExport={handleExport} isLoading={isLoading} />
      )}
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

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  label {
    ${fontSystem.body.medium}
  }
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 6px;
  ${fontSystem.body.medium}
`;

const SmallCompleteButton = styled(CompleteButton)`
  padding: 12px;
`;

const SmallCancelButton = styled(CancelButton)`
  padding: 12px;
`;
