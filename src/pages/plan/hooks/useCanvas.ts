import { useCallback, useEffect } from 'react';
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
import { socketEventBus } from '../hooks/useSocketHandler';
import type { WayPointCreateType, WayPointUpdateType } from '../types/WaypointResponseBodyType';
import type { MemoCreateType } from '../types/MemoResponseBodyType';
import { useSocket } from './useSocket';
import StompURL from '../utils/StompURL';

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

  useEffect(() => {
    function handleWaypointCreate(e: Event) {
      const { detail } = e as CustomEvent<WayPointCreateType>;
      const newWp = detail.WAYPOINT;

      setNodes((nds) => [
        ...nds,
        {
          id: `waypoint:${newWp.id}`,
          type: 'waypoint',
          position: { x: newWp.xPosition, y: newWp.yPosition },
          data: {
            ...newWp,
          },
        },
      ]);
    }

    socketEventBus.addEventListener('WAYPOINT_CREATE', handleWaypointCreate);
    return () => {
      socketEventBus.removeEventListener('WAYPOINT_CREATE', handleWaypointCreate);
    };
  }, [setNodes]);

  useEffect(() => {
    function handleWaypointUpdate(e: Event) {
      const { detail } = e as CustomEvent<WayPointUpdateType>;
      const newWp = detail.WAYPOINT;

      setNodes((nds) => {
        const nodeId = `waypoint:${newWp.id}`;
        const existingNode = nds.find((node) => node.id === nodeId);

        if (!existingNode) {
          console.error('정보를 동기화하는 과정에서 문제가 있었습니다.');
        }

        return nds.map((node) =>
          node.id === nodeId
            ? ({
                ...node,
                position: {
                  x: newWp.xPosition ?? node.position.x,
                  y: newWp.yPosition ?? node.position.y,
                },
                data: {
                  ...newWp,
                },
              } as WaypointNodeType)
            : node
        );
      });
    }

    socketEventBus.addEventListener('WAYPOINT_UPDATE', handleWaypointUpdate);
    return () => {
      socketEventBus.removeEventListener('WAYPOINT_UPDATE', handleWaypointUpdate);
    };
  }, [setNodes]);

  useEffect(() => {
    function handleMemoCreate(e: Event) {
      const { detail } = e as CustomEvent<MemoCreateType>;
      const newMemo = detail.MEMO;

      setNodes((nds) => [
        ...nds,
        {
          id: `memo:${newMemo.id}`,
          type: 'memo',
          position: { x: newMemo.xPosition, y: newMemo.yPosition },
          data: {
            ...newMemo,
          },
        },
      ]);
    }

    socketEventBus.addEventListener('MEMO_CREATE', handleMemoCreate);
    return () => {
      socketEventBus.removeEventListener('MEMO_CREATE', handleMemoCreate);
    };
  }, [setNodes]);

  const { planId, client } = useSocket();

  const onNodeDragStop = (_event: React.MouseEvent, node: CanvasNodes) => {
    switch (node.type) {
      case 'waypoint':
        client.publish({
          destination: StompURL.PUB.WAYPOINT.UPDATE(planId, node.data.id),
          body: JSON.stringify({
            ...node.data,
            xPosition: node.position.x,
            yPosition: node.position.y,
          } as WaypointData),
        });
        break;
      case 'memo':
        client.publish({
          destination: StompURL.PUB.MEMO.UPDATE(planId, node.data.id),
          body: JSON.stringify({
            ...node.data,
            xPosition: node.position.x,
            yPosition: node.position.y,
          } as MemoData),
        });
        break;
    }
  };

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    onNodeDragStop,
  };
}
