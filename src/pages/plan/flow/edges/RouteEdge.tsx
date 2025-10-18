import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from '@xyflow/react';
import { useState } from 'react';
import styled from 'styled-components';
import {
  VehicleCategoryInfo,
  vehicleCategoryOptions,
  type VehicleCategory,
} from '../../utils/Category';
import type { RouteEdgeType } from '../../hooks/useCanvas';
import { useDataSyncRoute } from '../../hooks/useDataSyncRoute';

export default function RouteEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps<RouteEdgeType>) {
  if (!data) {
    console.error('Route 데이터가 null 이었습니다.');
    return;
  }

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { setEdges } = useReactFlow();
  const [open, setOpen] = useState(false);

  const vehicleMeta = VehicleCategoryInfo[data!.vehicleCategory];
  const mergedStyle = {
    ...style,
    stroke: vehicleMeta.color,
    strokeWidth: 4,
  };

  const onDelete = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  const { handleLocalDataChange } = useDataSyncRoute({ id, data });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={mergedStyle} />
      <EdgeLabelRenderer>
        <LabelWrapper
          className="nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          {!open ? (
            <EditButton color={vehicleMeta.color} onClick={() => setOpen(true)}>
              {vehicleMeta.icon}
            </EditButton>
          ) : (
            <FormContainer>
              <FormRow>
                <label>제목</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => handleLocalDataChange('title', e.target.value)}
                />
              </FormRow>
              <FormRow>
                <label>설명</label>
                <input
                  type="text"
                  value={data.description}
                  onChange={(e) => handleLocalDataChange('description', e.target.value)}
                />
              </FormRow>
              <FormRow>
                <label>소요시간(분)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={data.duration}
                  onChange={(e) =>
                    handleLocalDataChange('duration', parseFloat(e.target.value) || 0)
                  }
                />
              </FormRow>
              <FormRow>
                <label>이동수단</label>
                <select
                  value={data!.vehicleCategory}
                  onChange={(e) =>
                    handleLocalDataChange('vehicleCategory', e.target.value as VehicleCategory)
                  }
                >
                  {vehicleCategoryOptions}
                </select>
              </FormRow>
              <FormActions>
                <ActionButton onClick={() => setOpen(false)}>닫기</ActionButton>
                <DeleteButton onClick={onDelete}>삭제</DeleteButton>
              </FormActions>
            </FormContainer>
          )}
        </LabelWrapper>
      </EdgeLabelRenderer>
    </>
  );
}

//
// ---------------------- styled-components ----------------------
//

const LabelWrapper = styled.div`
  position: absolute;
  z-index: 10;
  pointer-events: all;
`;

const EditButton = styled.button<{ color: string }>`
  background: #fff;
  border: 2px solid ${({ color }) => color};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${({ color }) => color}22;
    transform: scale(1.1);
  }
`;

const FormContainer = styled.div`
  background: #ffffff;
  border: 1px solid #aaa;
  border-radius: 8px;
  padding: 10px;
  min-width: 230px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 8px;

  label {
    font-size: 12px;
    color: #444;
  }

  input,
  select {
    font-size: 12px;
    padding: 4px 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    &:focus {
      border-color: #5c7cfa;
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background: #e9ecef;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: #dfe3e6;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #ffefef;
  border: 1px solid #ff9999;
  color: #d60000;
  &:hover {
    background: #ffd7d7;
  }
`;
