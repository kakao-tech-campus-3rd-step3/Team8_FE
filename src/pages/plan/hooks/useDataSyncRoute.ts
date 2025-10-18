import { useEffect, useRef } from 'react';
import { useSocket } from './useSocket';
import StompURL from '../utils/StompURL';
import { useReactFlow } from '@xyflow/react';
import type { RouteData } from '../flow/canvasComponents/Route';

export function useDataSyncRoute({ id, data }: { id: string; data: RouteData }) {
  const isInitialRender = useRef(true);
  const prevDataRef = useRef<RouteData>(data);
  const { planId, client } = useSocket();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const DEBOUNCE_TIME = 300;
  const { setEdges } = useReactFlow();
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
          destination: StompURL.PUB.ROUTE.UPDATE(planId, data.id),
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

  const handleLocalDataChange = <K extends keyof RouteData>(field: K, value: RouteData[K]) => {
    localUpdateRef.current = true;
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === id ? { ...edge, data: { ...edge.data, [field]: value } } : edge
      )
    );
  };

  return { handleLocalDataChange };
}
