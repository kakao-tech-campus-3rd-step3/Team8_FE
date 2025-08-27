import type { ModalPropType } from '@/hooks/useModal';
import styled from 'styled-components';
import type { MemberType } from '../types/member';

function InfoEditWindow({ closeModal, member }: ModalPropType & { member: MemberType }) {
  return (
    <InfoEditWindowWrapper>
      나의 정보 수정
      <button onClick={closeModal}>닫기</button>
    </InfoEditWindowWrapper>
  );
}

const InfoEditWindowWrapper = styled.div``;

export default InfoEditWindow;
