import styled from 'styled-components';
import background from './LandingPageBackground.svg';
import { fontSystem } from '@/styles/fontSystem';
import { colorSystem } from '@/styles/colorSystem';
import { usePageRouting } from '@/hooks/usePageRouting';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

function LandingPage() {
  const goto = usePageRouting();

  return (
    <LandingPageWrapper>
      <BackgroundImage src={background} alt="" />
      <StartButton onClick={goto.login}>계획 만들기</StartButton>
      <LoginButton />
      <RegisterButton />
      <HomeButton onClick={goto.home}>홈으로</HomeButton>
    </LandingPageWrapper>
  );
}

const LandingPageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const BackgroundImage = styled.img`
  width: 100%;
`;

const StartButton = styled.button`
  position: absolute;
  top: 13%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: clamp(12px, 2vw, 20px);
  background-color: ${colorSystem.tertiary_white._0};
  border: none;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  ${fontSystem.title.medium}
  font-size: clamp(14px, 2vw, 20px);

  cursor: pointer;
`;

const HomeButton = styled.button`
  position: absolute;
  bottom: 3.5%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: clamp(12px, 2vw, 20px);
  background-color: ${colorSystem.tertiary_white._0};
  border: none;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  ${fontSystem.title.medium}
  font-size: clamp(14px, 2vw, 20px);

  cursor: pointer;
`;

export default LandingPage;
