import { useState } from 'react';
import styled, { css } from 'styled-components';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import Close from '@/assets/icons/Close';
import type { User } from '../types/user';
import { dummyUsers } from '../data/dummyUsers';

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CollapseIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}
    >
      <path d="M7 14l5-5 5 5H7z" fill="black" />
    </svg>
  );
}

function InvitationPanel() {
  const [users, setUsers] = useState<User[]>(dummyUsers); 
  const [isExpanded, setIsExpanded] = useState(true);

  const removeUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const addUser = () => {
    console.log('새로운 사용자 추가 기능');
  };

  return (
    <PanelWrapper>
      {isExpanded && (
        <ContentWrapper>
          <UserList>
            {users.map((user) => (
              <UserItem key={user.id}>
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserRole>{user.role}</UserRole>
                </UserInfo>
                {user.role !== 'creator' && (
                  <RemoveButton onClick={() => removeUser(user.id)}>
                    <Close />
                  </RemoveButton>
                )}
              </UserItem>
            ))}
          </UserList>
          <AddButton onClick={addUser}>
            <PlusIcon />
          </AddButton>
        </ContentWrapper>
      )}
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        <CollapseIcon isExpanded={isExpanded} />
      </ToggleButton>
    </PanelWrapper>
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