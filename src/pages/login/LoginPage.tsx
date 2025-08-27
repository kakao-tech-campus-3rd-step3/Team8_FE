import styled from 'styled-components';
import logo from '../../../public/logo.svg';
import { fontSystem } from '@/styles/fontSystem';
import { colorSystem } from '@/styles/colorSystem';
import { useLoginForm } from './hooks/useLoginForm';

function LoginPage() {
  const { register, handleSubmit, errors, navigateToRegister } = useLoginForm();

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Title>로그인</Title>
      <StyledForm onSubmit={handleSubmit} noValidate>
        <InputGroup>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register('email', { required: '이메일을 입력해주세요' })}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </InputGroup>
        <InputGroup>
          <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password', { required: '비밀번호를 입력해주세요' })}
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </InputGroup>
        <SignupGuide>
          아직 계정이 없으신가요?{' '}
          <SignupLink type="button" onClick={navigateToRegister}>
            회원가입
          </SignupLink>
        </SignupGuide>
        <LoginButton type="submit">로그인</LoginButton>
      </StyledForm>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin-bottom: 32px;
  ${fontSystem.title.xlarge}
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 320px;
  background: #fff;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledLabel = styled.label`
  ${fontSystem.body.medium}
  color: ${colorSystem.tertiary_white._300}
`;

const StyledInput = styled.input`
  padding: 12px 14px;
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 6px;
  ${fontSystem.body.medium}
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #222;
  }
`;

const ErrorMsg = styled.span`
  margin-left: 4px;
  color: red;
  ${fontSystem.body.small}
`;

const LoginButton = styled.button`
  margin-top: 12px;
  padding: 12px 0;
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