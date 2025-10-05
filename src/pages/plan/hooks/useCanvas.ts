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

export type WaypointNode = Node<WaypointData, 'waypoint'>;
export type MemoNode = Node<MemoData, 'memo'>;
export type CanvasNode = WaypointNode | MemoNode;

export function useCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CanvasNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, type: 'route' }, eds)),
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
              description: '',
              address: '',
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
              text: '',
              Xposition: 0,
              Yposition: 0,
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
