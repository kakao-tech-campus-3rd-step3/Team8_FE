import styled from 'styled-components';
import { colorSystem } from '../../../styles/colorSystem';
import { fontSystem } from '../../../styles/fontSystem';
import { usePageRouting } from '@/hooks/usePageRouting'; // 훅 가져오기

const placeholderImages = {
  newTripIcon: '🗺️',
};

export function Banner() {
  const goto = usePageRouting(); // 훅 사용

  return (
    <BannerWrapper>
      <Title>
        <ColorSpan color={colorSystem.secondary_green._500}>J</ColorSpan>
        ourney
        <ColorSpan color={colorSystem.primary_yellow._400}> P</ColorSpan>
        lanner
      </Title>
      <Subtitle>나의 계획을 친구들에게 공유해보세요</Subtitle>
      
      {/*추후 계획 생성 기능 추가시 고유 ID로 변경 필요*/}
      <NewTripButton onClick={() => goto.plan.base('new').waypoint()}>
        <span>{placeholderImages.newTripIcon}</span> 새 여행 계획하기
      </NewTripButton>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.section`
  text-align: center;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h1`
  ${fontSystem.title.xlarge};
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 0;

  @media (max-width: 768px) {
    ${fontSystem.title.large};
  }
`;

const ColorSpan = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

const Subtitle = styled.p`
  ${fontSystem.body.medium};
  color: ${colorSystem.tertiary_white._500};
  margin: 0;
`;

const NewTripButton = styled.button`
  ${fontSystem.body.medium};
  background-color: ${colorSystem.tertiary_white._0};
  border: 1px solid ${colorSystem.tertiary_white._200};
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 16px;

  &:hover {
    background-color: ${colorSystem.tertiary_white._50};
  }
`;