import type { ModalPropType } from '@/hooks/useModal';
import styled from 'styled-components';

function PhotoEditWindow({ closeModal }: ModalPropType) {
  return (
    <PhotoEditWindowWrapper>
      나의 사진 수정
      <button onClick={closeModal}>닫기</button>
    </PhotoEditWindowWrapper>
  );
}

const PhotoEditWindowWrapper = styled.div``;

export default PhotoEditWindow;
