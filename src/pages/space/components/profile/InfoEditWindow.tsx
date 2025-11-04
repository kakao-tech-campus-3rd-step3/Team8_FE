import type { ModalPropType } from '@/hooks/useModal';
import type { MemberType } from '@/types/member';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

const updateMemberInfo = async (data: EditFormInputs) => {
  const { phone, name, ...rest } = data;
  // 서버 스키마에 맞춰 name -> username, phone -> contact로 매핑
  const payload = { ...rest, contact: phone, username: name };
  const response = await axiosInstance.patch(ENDPOINTS.members.me, payload);
  return response.data;
};

function InfoEditWindow({ closeModal, member }: ModalPropType & { member: MemberType }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateMemberInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberInfo'] });
      alert('회원정보 수정이 완료되었습니다!');
      closeModal();
    },
    onError: () => {
      alert('정보 수정에 실패했습니다.');
    },
  });

  const { register, handleSubmit, errors, isValid } = useEditForm({
    defaultValues: { ...member, phone: member.contact },
    onSubmit: (data: EditFormInputs) => {
      mutation.mutate(data);
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
          <CancelButton type="button" onClick={closeModal}>
            취소
          </CancelButton>
          <CompleteButton type="submit" disabled={!isValid || mutation.isPending}>
            {mutation.isPending ? '수정 중...' : '수정'}
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
