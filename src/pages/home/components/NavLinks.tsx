import styled from 'styled-components';
import { colorSystem } from '../../../styles/colorSystem';
import { fontSystem } from '../../../styles/fontSystem';
import { usePageRouting } from '@/hooks/usePageRouting';
import { useInvitationQuery } from '@/pages/inbox/hooks/useInvitationQuery';

const placeholderImages = {
  paperAirplane: 'https://i.pinimg.com/1200x/e2/6c/d7/e26cd7ead75785115a7144fdef259cef.jpg',
  windowSeat: 'https://i.pinimg.com/1200x/fd/14/47/fd1447fb3c91db32c1bc0ccbc4055a23.jpg',
};

export function NavLinks() {
  const goto = usePageRouting();
  const { data = [] } = useInvitationQuery();
  const invitationCount = data.length;

  return (
    <NavLinksWrapper>
      <NavLink image={placeholderImages.paperAirplane} onClick={goto.space}>
        <span>나의 계획 스페이스</span>
      </NavLink>
      <NavLink image={placeholderImages.windowSeat} onClick={goto.inbox}>
        <span>받은 편지함</span>
        {invitationCount > 0 && <Badge>{invitationCount}</Badge>}
      </NavLink>
    </NavLinksWrapper>
  );
}

const Badge = styled.div`
  position: absolute;
  top: -8px;
  right: -13px;
  background-color: #ff3b30;
  color: white;
  border-radius: 20px;
  padding: 4px 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NavLinksWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
`;

const NavLink = styled.a<{ image: string }>`
  ${fontSystem.title.large};
  position: relative;
  height: 150px;
  border-radius: 8px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  color: ${colorSystem.tertiary_white._0};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    ${fontSystem.title.small};
  }
`;
