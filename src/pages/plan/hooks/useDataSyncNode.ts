import { useEffect, useRef } from 'react';
import type { WaypointData } from '../flow/canvasComponents/Waypoint';
import { useSocket } from './useSocket';
import StompURL from '../utils/stompURL';
import { useReactFlow } from '@xyflow/react';
import type { MemoData } from '../flow/canvasComponents/Memo';

type AllowedTypes = WaypointData | MemoData;

function isWaypointData(data: AllowedTypes): data is WaypointData {
  return 'locationCategory' in data;
}

export function useDataSyncNode<DataType extends AllowedTypes>({
  id,
  data,
}: {
  id: string;
  data: DataType;
}) {
  const isInitialRender = useRef(true);
  const prevDataRef = useRef<DataType>(data);
  const { planId, client } = useSocket();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const DEBOUNCE_TIME = 300;
  const { setNodes } = useReactFlow();
  const localUpdateRef = useRef<boolean>(false);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      prevDataRef.current = data;
      return;
    }

    // 디바운싱
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const prev = prevDataRef.current;
      const changed = JSON.stringify(prev) !== JSON.stringify(data);

      if (changed && localUpdateRef.current) {
        const destination = isWaypointData(data)
          ? StompURL.PUB.WAYPOINT.UPDATE(planId, data.id)
          : StompURL.PUB.MEMO.UPDATE(planId, data.id);
        client.publish({
          destination,
          body: JSON.stringify(data),
        });

        prevDataRef.current = data;
      }
    }, DEBOUNCE_TIME);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data]);

  const handleLocalDataChange = <K extends keyof DataType>(field: K, value: DataType[K]) => {
    localUpdateRef.current = true;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id.toString() ? { ...node, data: { ...node.data, [field]: value } } : node
      )
    );
  };

  return { handleLocalDataChange };
}
