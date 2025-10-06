import { useCallback } from 'react';
import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Edge,
  type Connection,
  type Node,
} from '@xyflow/react';
import type { WaypointData } from '../flow/canvasComponents/Waypoint';
import type { MemoData } from '../flow/canvasComponents/Memo';
import type { ArrowData } from '../flow/canvasComponents/Arrow';

export type WaypointNodeType = Node<WaypointData, 'waypoint'>;
export type MemoNodeType = Node<MemoData, 'memo'>;
export type CanvasNodes = WaypointNodeType | MemoNodeType;
export type RouteEdgeType = Edge<ArrowData, 'route'>;
export type CanvasEdges = RouteEdgeType;

export function useCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CanvasNodes>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CanvasEdges>([]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge<RouteEdgeType>(
          {
            ...params,
            type: 'route',
            data: {
              startId: -1,
              endId: -1,
              title: '새 경로',
              description: '',
              duration: 0,
              transportationCategory: 'DEFAULT',
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const addNode = useCallback(
    (type: 'waypoint' | 'memo') => {
      const id = crypto.randomUUID();

      if (type === 'waypoint') {
        setNodes((nds) => [
          ...nds,
          {
            id,
            type: 'waypoint',
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: {
              id: 0,
              title: '새 위치',
              description: '설명',
              address: '주소',
              startTime: new Date(),
              endTime: new Date(),
              memoID: 0,
              locationCategory: 'DEFAULT',
              xPosition: 0,
              yPosition: 0,
            },
          },
        ]);
      } else {
        setNodes((nds) => [
          ...nds,
          {
            id,
            type: 'memo',
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: {
              title: '새 메모',
              content: '',
              xPosition: 0,
              yPosition: 0,
            },
          },
        ]);
      }
    },
    [setNodes]
  );

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    addNode,
  };
}
