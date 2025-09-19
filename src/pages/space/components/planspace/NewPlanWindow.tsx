import type { ModalPropType } from '@/hooks/useModal';
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
import { useNewPlanForm } from '@/pages/space/hooks/useNewPlanForm';
import type { NewPlanFormInputs } from '@/pages/space/utils/planValidation';

function NewPlanWindow({ closeModal }: ModalPropType) {
  const { register, handleSubmit, errors, isValid } = useNewPlanForm({
    defaultValues: {},
    onSubmit: (data: NewPlanFormInputs) => {
      // todo: POST API 호출
      console.log('서버로 전송할 데이터:', data);
      alert('새로운 계획을 만들었습니다.');
      closeModal();
    },
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ModalWindowWrapper>
        <WindowTopBar>
          <WindowTitle>새 여행 계획 만들기</WindowTitle>
          <CloseButton onClick={closeModal}>
            <Close />
          </CloseButton>
        </WindowTopBar>

        <FieldWrapper>
          <FormInputField<NewPlanFormInputs>
            id="title"
            label="제목"
            placeholder="여행 제목을 입력해주세요"
            register={register}
            error={errors.title}
          />
          <FormInputField<NewPlanFormInputs>
            id="description"
            label="설명"
            placeholder="여행 설명을 입력해주세요"
            register={register}
            error={errors.description}
          />
          <FormInputField<NewPlanFormInputs>
            id="startDate"
            label="시작일"
            register={register}
            error={errors.startDate}
            type="date"
          />
          <FormInputField<NewPlanFormInputs>
            id="endDate"
            label="종료일"
            register={register}
            error={errors.endDate}
            type="date"
          />
        </FieldWrapper>

        <ControlBar>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <CompleteButton type="submit" disabled={!isValid} onClick={() => {}}>
            완료
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

export default NewPlanWindow;
