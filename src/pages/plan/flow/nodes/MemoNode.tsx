import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import styled from 'styled-components';

function MemoNode(props: any) {
  return (
    <MemoNodeContainer>
      <MemoTitle type="text" className="nodrag" />
      <ContentDivider />
      <MemoArea className="nodrag" />
    </MemoNodeContainer>
  );
}

const ContentDivider = styled.div`
  background-color: ${colorSystem.tertiary_white._200};
  width: 100%;
  height: 1px;
`;

const MemoTitle = styled.input`
  background-color: transparent;
  border: none;
  outline: none;

  width: 100%;

  ${fontSystem.title.large}
`;

const MemoArea = styled.textarea`
  background-color: transparent;
  border: none;
  outline: none;

  min-width: 325px;
  /* resize: none; */
`;

const MemoNodeContainer = styled.div`
  color: white;
  background-color: ${colorSystem.primary_yellow._50};

  padding: 12px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
`;
export default MemoNode;
