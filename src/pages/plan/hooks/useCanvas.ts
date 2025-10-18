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
import type { RouteData } from '../flow/canvasComponents/Route';
import { socketEventBus } from '../hooks/useSocketHandler';
import type { WayPointResponseType } from '../types/WaypointResponseBodyType';
import type { MemoResponseType } from '../types/MemoResponseBodyType';
import { useSocket } from './useSocket';
import StompURL from '../utils/StompURL';
import type { RouteResponseType } from '../types/RouteResponseBodyType';

export type WaypointNodeType = Node<WaypointData, 'waypoint'>;
export type MemoNodeType = Node<MemoData, 'memo'>;
export type CanvasNodes = WaypointNodeType | MemoNodeType;
export type RouteEdgeType = Edge<RouteData, 'route'>;
export type CanvasEdges = RouteEdgeType;

export function useCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CanvasNodes>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CanvasEdges>([]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newRoute: Omit<RouteData, 'id'> = {
        fromWaypointId: parseInt(params.source.split(':')[1]),
        toWaypointId: parseInt(params.target.split(':')[1]),
        title: '새 경로',
        description: '',
        duration: 1,
        vehicleCategory: 'DEFAULT',
        planId: -1,
      };

      client.publish({
        destination: StompURL.PUB.ROUTE.CREATE(planId),
        body: JSON.stringify(newRoute),
      });

      // setEdges((eds) =>
      //   addEdge<RouteEdgeType>(
      //     {
      //       ...params,
      //       type: 'route',
      //       data: {
      //         fromWaypointId: parseInt(params.source.split(':')[1]),
      //         toWaypointId: parseInt(params.target.split(':')[1]),
      //         title: '새 경로',
      //         description: '',
      //         duration: 1,
      //         vehicleCategory: 'DEFAULT',
      //       },
      //     },
      //     eds
      //   )
      // );
    },

    [setEdges]
  );

  const onNodesDelete = useCallback((deletedNodes: CanvasNodes[]) => {
    deletedNodes.forEach((node) => {
      console.log(node);
      //Connected edge deletion is done from BE
      switch (node.type) {
        case 'waypoint': {
          client.publish({
            destination: StompURL.PUB.WAYPOINT.DELETE(planId, node.data.id),
          });
          break;
        }
        case 'memo': {
          client.publish({
            destination: StompURL.PUB.MEMO.DELETE(planId, node.data.id),
          });
          break;
        }
      }
    });
  }, []);

  const onEdgesDelete = useCallback((deletedEdges: CanvasEdges[]) => {
    deletedEdges.forEach((edge) => {
      client.publish({
        destination: StompURL.PUB.ROUTE.DELETE(planId, edge.data!.id),
      });
    });
  }, []);

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

        case 'DELETE': {
          const waypoint_id = detail.WAYPOINT;
          setNodes((nodes) => nodes.filter((node) => node.id !== `waypoint:${waypoint_id}`));
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

        case 'DELETE': {
          const memo_id = detail.MEMO;
          setNodes((nodes) => nodes.filter((node) => node.id !== `memo:${memo_id}`));
          break;
        }
      }
    }

    socketEventBus.addEventListener('MEMO_EVENT', handleMemoEvent);
    return () => socketEventBus.removeEventListener('MEMO_EVENT', handleMemoEvent);
  }, [setNodes]);

  useEffect(() => {
    function handleRouteEvent(e: Event) {
      const { detail } = e as CustomEvent<RouteResponseType>;

      switch (detail.type) {
        case 'INIT': {
          const newRoute: RouteEdgeType[] = detail.ROUTE.map((route) => ({
            id: `route:${route.id}`,
            source: `waypoint:${route.fromWaypointId}`,
            target: `waypoint:${route.toWaypointId}`,
            type: 'route',
            data: route,
          }));
          setEdges((eds) => {
            const filteredNewRoutes = newRoute.filter(
              (nr) => !eds.some((edge) => edge.id === nr.id)
            );
            return [...eds, ...filteredNewRoutes];
          });
          socketEventBus.dispatchEvent(new Event('ROUTE_INIT_DONE'));
          break;
        }
        case 'CREATE': {
          const newRoute = detail.ROUTE;
          setEdges((eds) =>
            addEdge<RouteEdgeType>(
              {
                id: `route:${newRoute.id}`,
                source: `waypoint:${newRoute.fromWaypointId}`,
                target: `waypoint:${newRoute.toWaypointId}`,
                type: 'route',
                data: newRoute,
              },
              eds
            )
          );
          break;
        }

        case 'UPDATE': {
          const route = detail.ROUTE;
          setEdges((eds) =>
            eds.map((edge) =>
              edge.id === `route:${route.id}`
                ? {
                    ...edge,
                    data: route,
                  }
                : edge
            )
          );
          break;
        }

        case 'DELETE': {
          const route_id = detail.ROUTE;
          setEdges((eds) => eds.filter((edge) => edge.id !== `route:${route_id}`));
          break;
        }
      }
    }

    socketEventBus.addEventListener('ROUTE_EVENT', handleRouteEvent);
    return () => socketEventBus.removeEventListener('ROUTE_EVENT', handleRouteEvent);
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
    onNodesDelete,
    onEdgesDelete,
  };
}
