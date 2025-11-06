import styled from 'styled-components';
import { fontSystem } from '@/styles/fontSystem';
import { useAcceptInvitation } from '../hooks/useAcceptInvitation';
import type { Invitation } from '../hooks/useInvitationQuery';
import { colorSystem } from '@/styles/colorSystem';

export default function IntivationCard({ invitation }: { invitation: Invitation }) {
  const { mutate } = useAcceptInvitation();

  const acceptInvitation = (invitation: Invitation) => {
    mutate(invitation);
  };

  return (
    <InvitationCard
      key={invitation.invitationId}
      onClick={() => {
        acceptInvitation(invitation);
      }}
    >
      <PlanTitle>{invitation.planTitle}</PlanTitle>
      <StatusTag status={invitation.status}>{invitation.status}</StatusTag>
    </InvitationCard>
  );
}

const InvitationCard = styled.button`
  background-color: ${colorSystem.tertiary_white._50};
  border: 1px solid ${colorSystem.tertiary_white._200};
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${colorSystem.tertiary_white._100};
  }
`;

const PlanTitle = styled.div`
  ${fontSystem.body.large};
  color: ${colorSystem.tertiary_white._800};
  font-weight: 600;
`;

const StatusTag = styled.div<{ status: string }>`
  ${fontSystem.body.small};
  background-color: ${({ status }) => (status === 'INVITED' ? '#ffebee' : '#e0f7fa')};
  color: ${({ status }) => (status === 'INVITED' ? '#d32f2f' : '#00796b')};
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
`;
