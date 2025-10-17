import { Client } from '@stomp/stompjs';
import { useEffect, useMemo } from 'react';
import StompURL from '../utils/StompURL';
import { WaypointDispatcherResolver } from '../utils/WaypointDispatcherResolver';
import { MemoDispatcherResolver } from '../utils/MemoDispatcherResolver';
import { initDependencies } from '../utils/InitDependencies';
import { topologicalSort } from '../utils/Topology';
import { RouteDispatcherResolver } from '../utils/RouteDispatcherResolver';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

type useSocketHandlerType = {
  planId: number;
};

export const socketEventBus = new EventTarget();

export default function useSocketHandler({ planId }: useSocketHandlerType) {
  const client = useMemo(
    () =>
      new Client({
        webSocketFactory: () => new WebSocket(`${API_BASE_URL}/ws`),
        onConnect: () => {
          subscribeAll();
          initAll();
          console.log('Stomp 연결 성공');
        },
        // debug: (str) => {
        //   console.log(new Date(), str);
        // },
      }),
    [planId]
  );

  function connect() {
    client.activate();
  }

  function disconnect() {
    client.deactivate();
  }

  function subscribeAll() {
    client.subscribe(StompURL.SUB.ERROR, (msg) => {
      console.log('❌ Error: ' + msg.body, 'error');
      try {
        const error = JSON.parse(msg.body);
        console.error(`에러 발생!\n[${error.code}] ${error.message}`);
      } catch (e) {
        console.error('에러 발생!\n' + msg.body);
      }
    });
    client.subscribe(StompURL.SUB.WAYPOINT(planId), WaypointDispatcherResolver);
    client.subscribe(StompURL.SUB.MEMO(planId), MemoDispatcherResolver);
    client.subscribe(StompURL.SUB.ROUTE(planId), RouteDispatcherResolver);
    client.subscribe(StompURL.SUB.TRAVELER(planId), (message) => {
      console.log('TRAVELER 메시지:', JSON.parse(message.body));
    });
  }

  function waitForInitComplete(eventName: string, timeout = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
      const handler = () => {
        socketEventBus.removeEventListener(eventName, handler);
        clearTimeout(timer);
        resolve();
      };
      const timer = setTimeout(() => {
        socketEventBus.removeEventListener(eventName, handler);
        reject(new Error(`${eventName} timeout`));
      }, timeout);

      socketEventBus.addEventListener(eventName, handler);
    });
  }

  async function initAll() {
    const sorted = topologicalSort(initDependencies);
    console.log('Init 순서:', sorted);

    for (const target of sorted) {
      switch (target) {
        case 'WAYPOINT':
          client.publish({ destination: StompURL.PUB.WAYPOINT.INIT(planId) });
          await waitForInitComplete('WAYPOINT_INIT_DONE');
          break;
        case 'MEMO':
          client.publish({ destination: StompURL.PUB.MEMO.INIT(planId) });
          await waitForInitComplete('MEMO_INIT_DONE');
          break;
        case 'ROUTE':
          client.publish({ destination: StompURL.PUB.ROUTE.INIT(planId) });
          // TBD: await waitForInitComplete('ROUTE_INIT_DONE');
          break;
        case 'TRAVELER':
          // TBD
          break;
      }
      console.log(`[INIT] ${target} 초기화 완료`);
    }
  }

  useEffect(() => {
    connect();

    return disconnect;
  }, [client]);

  return {
    client,
  };
}
