import type { ModalPropType } from '@/hooks/useModal';
import type { MemberType } from '../types/member';
import Close from '@/assets/icons/Close';
import {
  CancelButton,
  CloseButton,
  CompleteButton,
  ControlBar,
  ModalWindowWrapper,
  WindowTitle,
  WindowTopBar,
} from '../styles/modalWindowStyle';
import { styled } from 'styled-components';

function InfoEditWindow({ closeModal, member }: ModalPropType & { member: MemberType }) {
  return (
    <ModalWindowWrapper>
      <WindowTopBar>
        <WindowTitle>나의 정보 수정</WindowTitle>
        <CloseButton onClick={closeModal}>
          <Close />
        </CloseButton>
      </WindowTopBar>

      {/* 병합 후 수정 필요 */}
      <FieldWrapper>
        <div>
          <span>이메일</span> <input type="text" value={member.email} disabled />
        </div>
        <div>
          <span>이름</span> <input type="text" value={member.name} disabled />
        </div>
        <div>
          <span>연락처</span> <input type="text" value={member.contact} disabled />
        </div>
        <div>
          <span>MBTI</span> <input type="text" value={member.mbti} disabled />
        </div>
      </FieldWrapper>

      <ControlBar>
        <CancelButton onClick={closeModal}>취소</CancelButton>
        <CompleteButton
          onClick={() => {
            console.log('회원 정보 수정 API 호출');
          }}
        >
          수정
        </CompleteButton>
      </ControlBar>
    </ModalWindowWrapper>
  );
}

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default InfoEditWindow;
