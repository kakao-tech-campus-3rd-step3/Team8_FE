import type { ModalPropType } from '@/hooks/useModal';
import type { MemberType } from '@/pages/space/types/member';
import Close from '@/assets/icons/Close';
import {
  CancelButton,
  CloseButton,
  CompleteButton,
  ControlBar,
  ModalWindowWrapper,
  WindowTitle,
  WindowTopBar,
} from '@/pages/space/styles/modalWindowStyle';
import { styled } from 'styled-components';
import { FormInputField } from '@/components/FormInputField';
import { FormSelectField } from '@/components/FormSelectField';
import { useEditForm } from '../../hooks/useEditForm';
import { mbtiTypes, type EditFormInputs } from '../../utils/editValidation';

function InfoEditWindow({ closeModal, member }: ModalPropType & { member: MemberType }) {
  const { register, handleSubmit, errors, isValid } = useEditForm({
    defaultValues: { ...member, phone: member.contact },
    onSubmit: (data: EditFormInputs) => {
      // todo: PATCH API 호출
      console.log('서버로 전송할 데이터:', data);

      alert('회원정보 수정이 완료되었습니다!');
      closeModal();
    },
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ModalWindowWrapper>
        <WindowTopBar>
          <WindowTitle>나의 정보 수정</WindowTitle>
          <CloseButton onClick={closeModal}>
            <Close />
          </CloseButton>
        </WindowTopBar>

        {/* 병합 후 수정 필요 */}
        <FieldWrapper>
          <FormInputField<EditFormInputs>
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            register={register}
            error={errors.email}
          />
          <FormInputField<EditFormInputs>
            id="name"
            label="이름"
            placeholder="이름을 입력해주세요"
            register={register}
            error={errors.name}
          />
          <FormInputField<EditFormInputs>
            id="phone"
            label="연락처"
            placeholder="010-1234-5678"
            register={register}
            error={errors.phone}
          />
          <FormSelectField<EditFormInputs>
            id="mbti"
            label="MBTI (선택 사항)"
            register={register}
            error={errors.mbti}
            options={mbtiTypes}
            placeholder="MBTI를 선택하세요"
          />
        </FieldWrapper>

        <ControlBar>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <CompleteButton type="submit" disabled={!isValid} onClick={() => {}}>
            수정
          </CompleteButton>
        </ControlBar>
      </ModalWindowWrapper>
    </form>
  );
}

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default InfoEditWindow;
