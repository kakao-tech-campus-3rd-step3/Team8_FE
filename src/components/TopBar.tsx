import ArrowBackiOS from '@/assets/icons/ArrowBackiOS';
import { fontSystem } from '@/styles/fontSystem';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function TopBar(props: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <TopBarWrapper>
      <BackButton onClick={goBack}>
        <ArrowBackiOS />
      </BackButton>
      <TitleText>{props.children}</TitleText>
    </TopBarWrapper>
  );
}

const BackButton = styled.button`
  position: absolute;
  left: 16px;

  width: 40px;
  height: 40px;
  justify-self: flex-start;

  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const TitleText = styled.div`
  ${fontSystem.title.large}
`;

const TopBarWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 80px;
`;

export default TopBar;
