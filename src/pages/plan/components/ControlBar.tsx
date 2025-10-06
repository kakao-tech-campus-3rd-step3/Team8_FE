import { styled } from 'styled-components';
import FlagCircle from '@/assets/icons/FlagCircle';
import NoteAlt from '@/assets/icons/NoteAlt';
import { useSocket } from '../context/SocketContext';
import StompURL from '../utils/StompURL';
import type { MemoData } from '../flow/canvasComponents/Memo';

function ControlBar() {
  const { client, planId } = useSocket();

  const createNewWaypoint = () => {
    const newWaypoint = {
      name: '새 위치',
      description: '설명',
      address: '주소',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600 * 1000).toISOString(),
      locationCategory: 'DEFAULT',
      locationSubCategory: 'DEFAULT',
      xPosition: 0,
      yPosition: 0,
    };

    client.publish({
      destination: StompURL.PUB.WAYPOINT.CREATE(planId),
      body: JSON.stringify(newWaypoint),
    });
  };

  const createNewMemo = () => {
    const newMemo: MemoData = {
      title: '새 메모',
      content: '내용',
      xPosition: 0,
      yPosition: 0,
    };

    client.publish({
      destination: StompURL.PUB.MEMO.CREATE(planId),
      body: JSON.stringify(newMemo),
    });
  };

  return (
    <ControlBarWrapper>
      <NewNodeButton onClick={createNewWaypoint}>
        <FlagCircle />
      </NewNodeButton>
      <NewNodeButton onClick={createNewMemo}>
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
