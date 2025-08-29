import styled from 'styled-components';
import { useRegisterForm } from './hooks/useRegisterForm';
import { FormInputField } from '@/components/FormInputField';
import { mbtiTypes, type RegisterFormInputs } from './utils/registerValidation';
import { fontSystem } from '@/styles/fontSystem';
import { colorSystem } from '@/styles/colorSystem';
import { useNavigate } from 'react-router-dom';
import { FormSelectField } from '@/components/FormSelectField';
import TopBar from '@/components/TopBar';

function RegisterPage() {
  const { register, handleSubmit, errors, isValid } = useRegisterForm();
  const navigate = useNavigate();

  return (
    <Container>
      <TopBar>회원가입</TopBar>
      <Content>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <FormInputField<RegisterFormInputs>
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            register={register}
            error={errors.email}
          />
          <FormInputField<RegisterFormInputs>
            id="name"
            label="이름"
            placeholder="이름을 입력해주세요"
            register={register}
            error={errors.name}
          />
          <FormInputField<RegisterFormInputs>
            id="password"
            label="비밀번호"
            type="password"
            placeholder="영문, 숫자 포함 8자 이상"
            register={register}
            error={errors.password}
          />
          <FormInputField<RegisterFormInputs>
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            register={register}
            error={errors.confirmPassword}
          />
          <FormInputField<RegisterFormInputs>
            id="phone"
            label="연락처"
            placeholder="010-1234-5678"
            register={register}
            error={errors.phone}
          />
          <FormSelectField<RegisterFormInputs>
            id="mbti"
            label="MBTI (선택 사항)"
            register={register}
            error={errors.mbti}
            options={mbtiTypes}
            placeholder="MBTI를 선택하세요"
          />
          <SubmitButton type="submit" disabled={!isValid}>
            가입하기
          </SubmitButton>
          <LoginGuide>
            이미 계정이 있으신가요?{' '}
            <LoginLink type="button" onClick={() => navigate('/login')}>
              로그인
            </LoginLink>
          </LoginGuide>
        </StyledForm>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 40px 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 360px;
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const SubmitButton = styled.button`
  margin-top: 12px;
  padding: 12px 0;
  width: 100%;
  background: ${colorSystem.secondary_green._400};
  color: #fff;
  border: none;
  border-radius: 30px;
  ${fontSystem.body.large}
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: ${colorSystem.secondary_green._500};
  }

  &:disabled {
    background: ${colorSystem.tertiary_white._100};
    color: ${colorSystem.tertiary_white._300};
    cursor: not-allowed;
  }
`;

const LoginGuide = styled.div`
  margin-top: 10px;
  text-align: center;
  ${fontSystem.body.small}
  color: ${colorSystem.tertiary_white._300};
`;

const LoginLink = styled.button`
  background: none;
  border: none;
  color: ${colorSystem.secondary_green._400};
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;
  font-size: inherit;
  padding: 0;
  margin-left: 4px;
  &:hover {
    color: ${colorSystem.secondary_green._500};
  }
`;

export default RegisterPage;
