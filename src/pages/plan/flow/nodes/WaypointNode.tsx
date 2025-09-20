import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import styled from 'styled-components';

function WaypointNode(props: any) {
  return (
    <WaypointNodeContainer>
      <HorizontalLayout>
        <IconPlaceholder />
        <VerticalLayout>
          <Title>인천 공항 ICN</Title>
          <HorizontalLayout>
            <Description>인천로 공항시</Description>
            <Title>10:22~12:22</Title>
          </HorizontalLayout>
          <input type="text" className="nodrag" />
        </VerticalLayout>
      </HorizontalLayout>
    </WaypointNodeContainer>
  );
}

const Title = styled.div`
  color: inherit;
  ${fontSystem.title.xlarge}
`;

const Description = styled.div`
  color: inherit;
  ${fontSystem.body.small}
`;

const WaypointNodeContainer = styled.div`
  color: white;
  background-color: ${colorSystem.tertiary_white._700};

  padding: 12px;
  border-radius: 12px;
`;

const HorizontalLayout = styled.div`
  color: inherit;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VerticalLayout = styled.div`
  color: inherit;
  display: flex;
  flex-direction: column;
`;

const IconPlaceholder = styled.div`
  background-color: white;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WaypointNode;
