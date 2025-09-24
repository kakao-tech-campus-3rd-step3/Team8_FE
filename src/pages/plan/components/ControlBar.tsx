import { styled } from 'styled-components';
import FlagCircle from '@/assets/icons/FlagCircle';
import NoteAlt from '@/assets/icons/NoteAlt';

type ControlBarPropsType = {
  addNode: (type: 'waypoint' | 'memo') => void;
};

function ControlBar({ addNode }: ControlBarPropsType) {
  return (
    <ControlBarWrapper>
      <NewNodeButton onClick={() => addNode('waypoint')}>
        <FlagCircle />
      </NewNodeButton>
      <NewNodeButton onClick={() => addNode('memo')}>
        <NoteAlt />
      </NewNodeButton>
    </ControlBarWrapper>
  );
}

const ControlBarWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  background: white;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const NewNodeButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

export default ControlBar;
