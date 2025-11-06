import { useState } from 'react';
import styled, { css } from 'styled-components';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import Close from '@/assets/icons/Close';
import PlusIcon from './icons/PlusIcon';
import CollapseIcon from './icons/CollapseIcon';
import { useParams } from 'react-router-dom';
import { useFetchPlanDetail } from '../hooks/useFetchPlanDetail';
import type { TravelerType } from '@/api/types/traveler';

import { useModal } from '@/hooks/useModal';
import InvitationModalContent from './InvitationModalContent';

function InvitationPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const id = useParams().id ?? '-1';

  const [InvitationModal, openInvitationModal] = useModal({
    ModalWindow: InvitationModalContent,
    modalProps: { planId: id }, // 2. InvitationModalContent에 전달될 props
  });

  const removeUser = (id: number) => {
    console.log('Remove user (API 연동 필요):', id);
  };

  const { data, isLoading } = useFetchPlanDetail(id);

  if (isLoading) return null;

  return (
    <>
      <PanelWrapper>
        {isExpanded && (
          <ContentWrapper>
            <UserList>
              {data?.travelers.map((user: TravelerType) => (
                <UserItem key={user.id}>
                  <UserInfo>
                    <UserName>{user.name}</UserName>
                    <UserRole>{user.role}</UserRole>
                  </UserInfo>
                  {user.role !== 'OWNER' && (
                    <RemoveButton onClick={() => removeUser(user.id)}>
                      <Close />
                    </RemoveButton>
                  )}
                </UserItem>
              ))}
            </UserList>
            <AddButton onClick={openInvitationModal}>
              <PlusIcon />
            </AddButton>
          </ContentWrapper>
        )}
        <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          <CollapseIcon isExpanded={isExpanded} />
        </ToggleButton>
      </PanelWrapper>

      {InvitationModal}
    </>
  );
}

export default InvitationPanel;

const PanelWrapper = styled.div`
  position: fixed;
  top: 70px;
  left: 20px;
  width: 240px;
  background-color: ${colorSystem.tertiary_white._0};
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 24px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const UserName = styled.span`
  ${fontSystem.body.large}
  font-weight: 600;
`;

const UserRole = styled.span`
  ${fontSystem.body.small}
  color: ${colorSystem.tertiary_white._400};
`;

const baseButtonStyles = css`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const RemoveButton = styled.button`
  ${baseButtonStyles}
  svg {
    width: 16px;
    height: 16px;
  }
`;

const AddButton = styled.button`
  ${baseButtonStyles}
  width: 100%;
  padding: 4px 0;
`;

const ToggleButton = styled.button`
  ${baseButtonStyles}
  width: 100%;
  height: 16px;
  padding-top: 4px;
  border-top: 1px solid ${colorSystem.tertiary_white._100};
`;
