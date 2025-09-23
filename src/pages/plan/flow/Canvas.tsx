import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './nodeTypes';
import EditGuard from './responsive/EditGuard';
import { isMobile } from 'react-device-detect';
import { useCallback } from 'react';

const initialNodes = [
  {
    id: '1',
    type: 'waypoint',
    position: { x: 0, y: 0 },
    data: { value: '123' },
  },
  {
    id: '1-2',
    type: 'waypoint',
    position: { x: 0, y: 0 },
    data: { value: '123' },
  },
  {
    id: '2',
    type: 'memo',
    position: { x: 0, y: 0 },
    data: { value: '123' },
  },
];

function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const canEdit = !isMobile;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <EditGuard enabled={!canEdit}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          /* 편집 이벤트는 canEdit일 때만 허용, 편집 제한 정책이 바뀌면 prop수정 필요 */
          onNodesChange={canEdit ? onNodesChange : undefined}
          onEdgesChange={canEdit ? onEdgesChange : undefined}
          nodesDraggable={canEdit}
          nodesConnectable={canEdit}
          elementsSelectable={canEdit}
          style={{ backgroundColor: '#B8CEFF', width: '100%', height: '100%' }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </EditGuard>
    </div>
  );
}

export default Canvas;
