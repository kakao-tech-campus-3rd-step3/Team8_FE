import styled from 'styled-components';
import { colorSystem } from '../../../styles/colorSystem';
import { fontSystem } from '../../../styles/fontSystem';
import { usePageRouting } from '@/hooks/usePageRouting';

const placeholderImages = {
  windowSeat: 'https://i.pinimg.com/1200x/fd/14/47/fd1447fb3c91db32c1bc0ccbc4055a23.jpg',
};

export function NavLinks() {
  const goto = usePageRouting();

  return (
    <NavLinksWrapper>
      <NavLink image={placeholderImages.windowSeat} onClick={goto.space}>
        <span>Mypage</span>
      </NavLink>
    </NavLinksWrapper>
  );
}

const NavLinksWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
  justify-items: center; /* 아이템을 수평 중앙 정렬 */
`;

const NavLink = styled.a<{ image: string }>`
  ${fontSystem.title.large};
  width: clamp(240px, 90vw, 520px); /* 반응형 너비 축소 */
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
    width: clamp(220px, 92vw, 460px);
    height: 140px;
  }
`;
