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
import type { RouteData } from '../canvasComponents/Route';
import type { RouteEdgeType } from '../../hooks/useCanvas';

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

  // 기본 데이터 안전 처리
  const mergedData: RouteData = {
    fromWaypointId: data?.fromWaypointId ?? -1,
    toWaypointId: data?.toWaypointId ?? -1,
    title: data?.title ?? '새 경로',
    description: data?.description ?? '',
    duration: data?.duration ?? 1,
    vehicleCategory: data?.vehicleCategory ?? 'DEFAULT',
  };

  const vehicleMeta = VehicleCategoryInfo[mergedData.vehicleCategory];
  const mergedStyle = {
    ...style,
    stroke: vehicleMeta.color,
    strokeWidth: 4,
  };

  const onDelete = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  const onUpdateData = <K extends keyof RouteData>(key: K, value: RouteData[K]) => {
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === id ? { ...edge, data: { ...edge.data, [key]: value } } : edge
      )
    );
  };

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
                  value={mergedData.title}
                  onChange={(e) => onUpdateData('title', e.target.value)}
                />
              </FormRow>
              <FormRow>
                <label>설명</label>
                <input
                  type="text"
                  value={mergedData.description}
                  onChange={(e) => onUpdateData('description', e.target.value)}
                />
              </FormRow>
              <FormRow>
                <label>소요시간(분)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={mergedData.duration}
                  onChange={(e) => onUpdateData('duration', parseFloat(e.target.value) || 0)}
                />
              </FormRow>
              <FormRow>
                <label>이동수단</label>
                <select
                  value={mergedData.vehicleCategory}
                  onChange={(e) =>
                    onUpdateData('vehicleCategory', e.target.value as VehicleCategory)
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
