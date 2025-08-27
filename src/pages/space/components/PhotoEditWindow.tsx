import type { ModalPropType } from '@/hooks/useModal';
import styled from 'styled-components';
import {
  CancelButton,
  CloseButton,
  CompleteButton,
  ControlBar,
  ModalWindowWrapper,
  WindowTitle,
  WindowTopBar,
} from '../styles/modalWindowStyle';
import Close from '@/assets/icons/Close';
import { useState } from 'react';
import { colorSystem } from '@/styles/colorSystem';

function PhotoEditWindow({ closeModal }: ModalPropType) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <ModalWindowWrapper>
      <WindowTopBar>
        <WindowTitle>나의 사진 수정</WindowTitle>
        <CloseButton onClick={closeModal}>
          <Close />
        </CloseButton>
      </WindowTopBar>

      <PreviewDiv>{preview && <PreviewImage src={preview} alt="preview" />}</PreviewDiv>
      <input id="photo-input" type="file" accept="image/*" hidden onChange={handleFileChange} />
      <label htmlFor="photo-input">
        <button>사진 업로드</button>
      </label>

      <ControlBar>
        <CancelButton onClick={closeModal}>취소</CancelButton>
        <CompleteButton
          onClick={() => {
            console.log('회원 사진 수정 API 호출');
          }}
        >
          수정
        </CompleteButton>
      </ControlBar>
    </ModalWindowWrapper>
  );
}

const PreviewDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 64px;
  object-fit: cover;
  background-color: ${colorSystem.tertiary_white._400};
`;

export default PhotoEditWindow;
