import styled from 'styled-components';
import { fontSystem } from '@/styles/fontSystem';
import { colorSystem } from '@/styles/colorSystem';
import { usePageRouting } from '@/hooks/usePageRouting';
import Lock from './assets/icons/Lock.svg';

function LoginButton() {
  const goto = usePageRouting();

  return (
    <LoginButtonWrapper onClick={goto.login}>
      <img src={Lock} alt="" />
      로그인
    </LoginButtonWrapper>
  );
}

const LoginButtonWrapper = styled.button`
  position: absolute;
  bottom: 12%;
  left: 22%;
  transform: translate(-50%, -50%);

  width: clamp(80px, 15vw, 120px);
  height: clamp(40px, 5vw, 50px);
  padding: clamp(8px, 2vw, 12px);

  color: #4a53fb;
  background-color: ${colorSystem.tertiary_white._0};
  border: 1px solid ${colorSystem.tertiary_white._1000};
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  ${fontSystem.body.medium}
  font-size: clamp(12px, 2vw, 16px);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  cursor: pointer;
`;

export default LoginButton;
