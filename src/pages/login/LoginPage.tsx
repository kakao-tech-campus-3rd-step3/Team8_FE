import styled from 'styled-components';
import logo from '../../../public/logo.svg';
import { fontSystem } from '@/styles/fontSystem';
import { colorSystem } from '@/styles/colorSystem';
import { useLoginForm } from '@/pages/login/hooks/useLoginForm';
import { FormInputField } from '@/components/FormInputField';
import type { LoginFormInputs } from '@/pages/login/utils/loginValidation';
import TopBar from '@/components/TopBar';

function LoginPage() {
  const { register, handleSubmit, errors, isValid, navigateToRegister } = useLoginForm();

  return (
    <Container>
      <TopBar>로그인</TopBar>
      <Content>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Logo src={logo} alt="logo" />
          <FormInputField<LoginFormInputs>
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            register={register}
            error={errors.email}
          />
          <FormInputField<LoginFormInputs>
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            register={register}
            error={errors.password}
          />
          <SignupGuide>
            아직 계정이 없으신가요?{' '}
            <SignupLink type="button" onClick={navigateToRegister}>
              회원가입
            </SignupLink>
          </SignupGuide>
          <LoginButton type="submit" disabled={!isValid}>
            로그인
          </LoginButton>
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
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 24px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; // InputField가 width: 100%를 가지므로 정렬을 위해 추가
  gap: 16px;
  width: 320px;
  background: #fff;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const LoginButton = styled.button`
  margin-top: 12px;
  padding: 12px 0;
  width: 100%; // 다른 필드와 너비를 맞추기 위해 추가
  background: ${colorSystem.secondary_green._400};
  color: #fff;
  border: none;
  border-radius: 30px;
  ${fontSystem.body.large}
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${colorSystem.secondary_green._500};
  }
  &:disabled {
    background: ${colorSystem.tertiary_white._100};
    color: ${colorSystem.tertiary_white._300};
    cursor: not-allowed;
  }
`;

const SignupGuide = styled.div`
  margin: 10px 0 0 0;
  text-align: center;
  ${fontSystem.body.small}
  color: ${colorSystem.tertiary_white._300};
`;

const SignupLink = styled.button`
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

export default LoginPage;
