import styled from 'styled-components';
import { colorSystem } from '../../../styles/colorSystem';
import { fontSystem } from '../../../styles/fontSystem';

const placeholderImages = {
  paperAirplane: 'https://i.pinimg.com/1200x/e2/6c/d7/e26cd7ead75785115a7144fdef259cef.jpg',
  windowSeat: 'https://i.pinimg.com/1200x/fd/14/47/fd1447fb3c91db32c1bc0ccbc4055a23.jpg',
};

export function NavLinks() {
  return (
    <NavLinksWrapper>
      <NavLink image={placeholderImages.paperAirplane}>
        <span>모든 개인 스페이스 보기</span>
      </NavLink>
      <NavLink image={placeholderImages.windowSeat}>
        <span>Mypage</span>
      </NavLink>
    </NavLinksWrapper>
  );
}

const NavLinksWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
`;

const NavLink = styled.a<{ image: string }>`
  ${fontSystem.title.large};
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