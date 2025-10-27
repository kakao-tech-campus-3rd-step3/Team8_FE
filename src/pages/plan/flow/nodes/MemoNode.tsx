import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import styled from 'styled-components';
import type { MemoData } from '../canvasComponents/Memo';
import { useDataSync } from '../../hooks/useDataSync';

// props로 data 받아올 수 있습니다.
function MemoNode({ id, data, selected }: { id: string; data: MemoData; selected: boolean }) {
  const { handleLocalDataChange } = useDataSync<MemoData>({ id, data });

  return (
    <MemoNodeContainer selected={selected}>
      <MemoTitle
        type="text"
        className="nodrag"
        value={data.title}
        onChange={(e) => {
          handleLocalDataChange('title', e.target.value);
        }}
      />
      <ContentDivider />
      <MemoArea
        className="nodrag"
        value={data.content}
        onChange={(e) => {
          handleLocalDataChange('content', e.target.value);
        }}
      />
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

const MemoNodeContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>`
  color: white;
  background-color: ${colorSystem.primary_yellow._50};

  padding: 12px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  border: ${({ selected }) => (selected ? `4px solid ${colorSystem.primary_yellow._400}` : 'none')};
`;
export default MemoNode;
