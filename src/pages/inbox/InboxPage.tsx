import styled from 'styled-components';
import { colorSystem } from '../../styles/colorSystem';
import { useAuth } from '@/hooks/useAuth';
import { usePageRouting } from '@/hooks/usePageRouting';
import ArrowBackiOS from '@/assets/icons/ArrowBackiOS';
import { fontSystem } from '@/styles/fontSystem';

export default function InboxPage() {
  const { logout } = useAuth();
  const goto = usePageRouting();

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={goto.back}>
          <ArrowBackiOS />
        </BackButton>
        <TitleText>받은 편지함</TitleText>
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
      </Header>
      {/* <Logo src={placeholderImages.logo} alt="Journey Planner Logo" /> */}
    </PageWrapper>
  );
}

const TitleText = styled.div`
  ${fontSystem.title.large}
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colorSystem.tertiary_white._0};
  padding: 0 24px;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${colorSystem.tertiary_white._100};
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.tertiary_white._200};
  background: ${colorSystem.tertiary_white._0};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: ${colorSystem.tertiary_white._500};
`;
