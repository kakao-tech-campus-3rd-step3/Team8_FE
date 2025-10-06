import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useEffect, useMemo } from 'react';
import StompURL from '../utils/StompURL';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

type useSocketHandlerType = {
  planId: number;
};

export default function useSocketHandler({ planId }: useSocketHandlerType) {
  const client = useMemo(
    () =>
      new Client({
        webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
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
    client.subscribe(StompURL.SUB.WAYPOINT(planId), (message) => {
      console.log('WAYPOINT 메시지:', JSON.parse(message.body));
    });
    client.subscribe(StompURL.SUB.MEMO(planId), (message) => {
      console.log('MEMO 메시지:', JSON.parse(message.body));
    });
    client.subscribe(StompURL.SUB.ROUTE(planId), (message) => {
      console.log('ROUTE 메시지:', JSON.parse(message.body));
    });
    client.subscribe(StompURL.SUB.TRAVELER(planId), (message) => {
      console.log('TRAVELER 메시지:', JSON.parse(message.body));
    });
  }

  function initAll() {
    client.publish({
      destination: StompURL.PUB.WAYPOINT.INIT(planId),
    });
    client.publish({
      destination: StompURL.PUB.MEMO.INIT(planId),
    });
    client.publish({
      destination: StompURL.PUB.ROUTE.INIT(planId),
    });
    //TRAVELER init 작업 추후에 수행
  }

  useEffect(() => {
    connect();

    return disconnect;
  }, [client]);

  return {
    client,
  };
}
