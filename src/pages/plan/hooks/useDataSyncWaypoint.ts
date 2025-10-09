import { useEffect, useRef } from 'react';
import type { WaypointData } from '../flow/canvasComponents/Waypoint';

export function useDataSyncWaypoint({ data }: { data: WaypointData }) {
  const isInitialRender = useRef(true);
  const prevDataRef = useRef<WaypointData>(data);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      prevDataRef.current = data;
      return;
    }

    const prev = prevDataRef.current;
    const changed = JSON.stringify(prev) !== JSON.stringify(data);

    if (changed) {
      console.log('웨이포인트 웹 소켓 데이터 전송', data);
      prevDataRef.current = data;
    }
  }, [data]);
}
