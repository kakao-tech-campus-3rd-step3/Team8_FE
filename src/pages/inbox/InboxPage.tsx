import styled from 'styled-components';
import { colorSystem } from '../../styles/colorSystem';
import { useAuth } from '@/hooks/useAuth';
import { usePageRouting } from '@/hooks/usePageRouting';
import ArrowBackiOS from '@/assets/icons/ArrowBackiOS';
import { fontSystem } from '@/styles/fontSystem';
import { useInvitationQuery } from './hooks/useInvitationQuery';
import InvitationCard from './components/InvitationCard';
// import { usePlansFromInvitations } from './hooks/usePlansFromInvitations';

export default function InboxPage() {
  const { logout } = useAuth();
  const goto = usePageRouting();
  const { data: invitationData = [] } = useInvitationQuery();
  // const plans = usePlansFromInvitations(invitationData);

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={goto.back}>
          <ArrowBackiOS />
        </BackButton>
        <TitleText>받은 편지함</TitleText>
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
      </Header>

      <InvitationList>
        카드를 누르면 초대가 수락됩니다
        {invitationData.length === 0 ? (
          <EmptyState>아직 받은 초대가 없습니다 ✉️</EmptyState>
        ) : (
          invitationData.map((invitation) => (
            <InvitationCard invitation={invitation} key={invitation.invitationId} />
          ))
        )}
      </InvitationList>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colorSystem.tertiary_white._0};
  padding: 0 24px;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${colorSystem.tertiary_white._100};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled.div`
  ${fontSystem.title.large};
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

const LogoutButton = styled.button`
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.tertiary_white._200};
  background: ${colorSystem.tertiary_white._0};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: ${colorSystem.tertiary_white._500};
`;

const InvitationList = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyState = styled.div`
  margin-top: 60px;
  text-align: center;
  color: ${colorSystem.tertiary_white._500};
  ${fontSystem.body.medium};
`;
