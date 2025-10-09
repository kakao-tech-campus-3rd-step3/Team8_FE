import { useEffect, useRef } from 'react';
import type { WaypointData } from '../flow/canvasComponents/Waypoint';
import { useSocket } from './useSocket';
import StompURL from '../utils/StompURL';
import { useReactFlow } from '@xyflow/react';

export function useDataSyncWaypoint({ id, data }: { id: string; data: WaypointData }) {
  const isInitialRender = useRef(true);
  const prevDataRef = useRef<WaypointData>(data);
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
        client.publish({
          destination: StompURL.PUB.WAYPOINT.UPDATE(planId, data.id),
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

  const handleLocalDataChange = (field: keyof WaypointData, value: any) => {
    localUpdateRef.current = true;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id.toString() ? { ...node, data: { ...node.data, [field]: value } } : node
      )
    );
  };

  return { handleLocalDataChange };
}
