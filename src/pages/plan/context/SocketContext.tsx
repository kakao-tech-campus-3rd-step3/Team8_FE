import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import useSocketHandler from '../hooks/useSocketHandler';

type SocketContextValue = {
  client: ReturnType<typeof useSocketHandler>['client'];
  planId: number;
};

export const SocketContext = createContext<SocketContextValue | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within a SocketProvider');
  return context;
};

export const SocketProvider = ({ planId, children }: { planId: number; children: ReactNode }) => {
  const { client } = useSocketHandler({ planId });

  return (
    <SocketContext.Provider value={{ client, planId }}>
      {client ? children : <>실시간 연결을 생성중입니다...</>}
    </SocketContext.Provider>
  );
};
