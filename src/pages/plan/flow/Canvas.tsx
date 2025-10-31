import { Background, Controls, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './nodeTypes';
import EditGuard from './responsive/EditGuard';
import { isMobile } from 'react-device-detect';
import { colorSystem } from '@/styles/colorSystem';
import ControlBar from '../components/ControlBar';
import { useCanvas } from '../hooks/useCanvas';
import styled from 'styled-components';
import { edgeTypes } from './edgeTypes';
// const initialNodes = [{ id: '1', type: 'waypoint', position: { x: 0, y: 0 }, data: { value: '123' } }, { id: '2', type: 'memo', position: { x: 0, y: 0 }, data: { value: '123' } }];

function Canvas() {
  const canEdit = !isMobile;

  const {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    onNodeDragStop,
    onNodesDelete,
    onEdgesDelete,
  } = useCanvas();

  return (
    <CanvasWrapper>
      <EditGuard enabled={!canEdit}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onConnect={onConnect}
          /* 편집 이벤트는 canEdit일 때만 허용, 편집 제한 정책이 바뀌면 prop수정 필요 */
          onNodesChange={canEdit ? onNodesChange : undefined}
          onEdgesChange={canEdit ? onEdgesChange : undefined}
          nodesDraggable={canEdit}
          nodesConnectable={canEdit}
          onNodeDragStop={onNodeDragStop}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          elementsSelectable={canEdit}
          style={{ backgroundColor: '#B8CEFF', width: '100%', height: '100%' }}
          fitView
          defaultEdgeOptions={{
            style: { stroke: `${colorSystem.secondary_green._500}`, strokeWidth: 4 },
            animated: true,
          }}
        >
          <Background />
          <Controls />
          <ControlBar />
        </ReactFlow>
      </EditGuard>
    </CanvasWrapper>
  );
}

const CanvasWrapper = styled.div`
  height: calc(100vh - 98px);
  width: 100%;
`;

export default Canvas;
