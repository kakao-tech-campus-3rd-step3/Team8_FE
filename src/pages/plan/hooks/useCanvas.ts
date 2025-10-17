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
import type { WayPointResponseType } from '../types/WaypointResponseBodyType';
import type { MemoResponseType } from '../types/MemoResponseBodyType';
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
    function handleWaypointEvent(e: Event) {
      const { detail } = e as CustomEvent<WayPointResponseType>;

      switch (detail.type) {
        case 'INIT': {
          const newWps: WaypointNodeType[] = detail.WAYPOINT.map((wp) => ({
            id: `waypoint:${wp.id}`,
            type: 'waypoint',
            position: { x: wp.xPosition, y: wp.yPosition },
            data: wp,
          }));
          setNodes((nds) => [...nds, ...newWps]);
          socketEventBus.dispatchEvent(new Event('WAYPOINT_INIT_DONE'));
          break;
        }
        case 'CREATE': {
          const wp = detail.WAYPOINT;
          setNodes((nds) => [
            ...nds,
            {
              id: `waypoint:${wp.id}`,
              type: 'waypoint',
              position: { x: wp.xPosition, y: wp.yPosition },
              data: wp,
            },
          ]);
          break;
        }
        case 'UPDATE': {
          const wp = detail.WAYPOINT;
          setNodes((nds) =>
            nds.map((node) =>
              node.id === `waypoint:${wp.id}`
                ? ({
                    ...node,
                    position: {
                      x: wp.xPosition ?? node.position.x,
                      y: wp.yPosition ?? node.position.y,
                    },
                    data: wp,
                  } as WaypointNodeType)
                : node
            )
          );
          break;
        }
      }
    }

    socketEventBus.addEventListener('WAYPOINT_EVENT', handleWaypointEvent);
    return () => socketEventBus.removeEventListener('WAYPOINT_EVENT', handleWaypointEvent);
  }, [setNodes]);

  useEffect(() => {
    function handleMemoEvent(e: Event) {
      const { detail } = e as CustomEvent<MemoResponseType>;

      switch (detail.type) {
        case 'INIT': {
          const newMemos: MemoNodeType[] = detail.MEMO.map((memo) => ({
            id: `memo:${memo.id}`,
            type: 'memo',
            position: { x: memo.xPosition, y: memo.yPosition },
            data: memo,
          }));
          setNodes((nds) => [...nds, ...newMemos]);
          socketEventBus.dispatchEvent(new Event('MEMO_INIT_DONE'));
          break;
        }

        case 'CREATE': {
          const memo = detail.MEMO;
          setNodes((nds) => [
            ...nds,
            {
              id: `memo:${memo.id}`,
              type: 'memo',
              position: { x: memo.xPosition, y: memo.yPosition },
              data: memo,
            },
          ]);
          break;
        }

        case 'UPDATE': {
          const memo = detail.MEMO;
          setNodes((nds) =>
            nds.map((node) =>
              node.id === `memo:${memo.id}`
                ? ({
                    ...node,
                    position: {
                      x: memo.xPosition ?? node.position.x,
                      y: memo.yPosition ?? node.position.y,
                    },
                    data: memo,
                  } as MemoNodeType)
                : node
            )
          );
          break;
        }
      }
    }

    socketEventBus.addEventListener('MEMO_EVENT', handleMemoEvent);
    return () => socketEventBus.removeEventListener('MEMO_EVENT', handleMemoEvent);
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
