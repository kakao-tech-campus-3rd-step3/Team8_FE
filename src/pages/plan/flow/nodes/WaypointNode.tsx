import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import { LocationCategoryInfo, type LocationCategory } from '@/pages/plan/utils/Category';
import { CustomTimeInput } from './CustomTimeInput';
import { type WaypointData } from '../canvasComponents/Waypoint';
import { useAutosizeInput } from '../../hooks/useAutosizeInput';
import { Handle, Position } from '@xyflow/react';
import { useDataSyncWaypoint } from '../../hooks/useDataSyncWaypoint';

function WaypointNode({ id, data }: { id: string; data: WaypointData }) {
  const [isCategorySelectorOpen, setCategorySelectorOpen] = useState(false);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  const { handleLocalDataChange } = useDataSyncWaypoint({ id, data });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (iconWrapperRef.current && !iconWrapperRef.current.contains(event.target as Node)) {
        setCategorySelectorOpen(false);
      }
    }
    if (isCategorySelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategorySelectorOpen]);

  const handleCategoryChange = (selectedCategory: LocationCategory) => {
    handleLocalDataChange('locationCategory', selectedCategory);
    setCategorySelectorOpen(false);
  };

  const nameProps = useAutosizeInput(data.name);
  const addressProps = useAutosizeInput(data.description);

  return (
    // LocationCategoryInfo 사용
    <WaypointNodeContainer bgColor={LocationCategoryInfo[data.locationCategory].color}>
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <HorizontalLayout>
        <IconWrapper ref={iconWrapperRef}>
          <IconPlaceholder onClick={() => setCategorySelectorOpen((prev) => !prev)}>
            {/* LocationCategoryInfo 사용 */}
            {LocationCategoryInfo[data.locationCategory].icon}
          </IconPlaceholder>
          {isCategorySelectorOpen && (
            <CategoryDropdown>
              {/* Object.keys(LocationCategoryInfo) 사용 */}
              {(Object.keys(LocationCategoryInfo) as LocationCategory[]).map((cat) => (
                <CategoryItem key={cat} onClick={() => handleCategoryChange(cat)}>
                  {/* LocationCategoryInfo 사용 */}
                  {LocationCategoryInfo[cat].icon} {cat}
                </CategoryItem>
              ))}
            </CategoryDropdown>
          )}
        </IconWrapper>
        <VerticalLayout>
          {/* 6. UI 요소들이 data state를 사용하도록 바인딩 수정 */}
          <Name
            as="input"
            type="text"
            value={data.name}
            onChange={(e) => handleLocalDataChange('name', e.target.value)}
            className="nodrag"
            {...nameProps}
          />
          <HorizontalLayout>
            <Address
              as="input"
              type="text"
              value={data.address}
              onChange={(e) => handleLocalDataChange('address', e.target.value)}
              className="nodrag"
              {...addressProps}
            />
            <TimeWrapper>
              <DatePicker
                selected={new Date(data.startTime!)}
                onChange={(date: Date | null) => handleLocalDataChange('startTime', date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="HH:mm"
                customInput={<CustomTimeInput />}
              />
              ~
              <DatePicker
                selected={new Date(data.endTime!)}
                onChange={(date: Date | null) => handleLocalDataChange('endTime', date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="HH:mm"
                customInput={<CustomTimeInput />}
              />
            </TimeWrapper>
          </HorizontalLayout>
          <DescriptionArea
            placeholder="메모..."
            className="nodrag"
            value={data.description}
            onChange={(e) => handleLocalDataChange('description', e.target.value)}
          />
        </VerticalLayout>
      </HorizontalLayout>
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </WaypointNodeContainer>
  );
}

const IconWrapper = styled.div`
  position: relative;
`;

const CategoryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  z-index: 10;
  width: 150px;

  background-color: white;
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 4px;
`;

const CategoryItem = styled.div`
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: black;
  font-size: 14px;

  &:hover {
    background-color: ${colorSystem.tertiary_white._50};
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;

  .react-datepicker-wrapper {
    display: inline-block;
  }
  .react-datepicker__input-container {
    display: inline-block;
  }
  .react-datepicker {
    font-family: 'Pretendard Variable', sans-serif;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .react-datepicker__header {
    background-color: ${colorSystem.primary_yellow._100};
    border-bottom: 1px solid #ccc;
  }
  .react-datepicker__time-container {
    width: 150px;
  }
  .react-datepicker__time-list-item--selected {
    background-color: ${colorSystem.primary_yellow._400} !important;
    color: white !important;
  }
  .react-datepicker__time-list-item:hover {
    background-color: ${colorSystem.primary_yellow._100} !important;
  }
`;

const BaseInputStyles = `
  background-color: transparent;
  border: none;
  outline: none;
  color: inherit;
  padding: 0;
  min-width: 50px;
`;

const Name = styled.div`
  ${fontSystem.title.xlarge}
  ${BaseInputStyles}
`;

const Address = styled.div`
  ${fontSystem.body.small}
  ${BaseInputStyles}
`;

const DescriptionArea = styled.textarea`
  ${BaseInputStyles}
  ${fontSystem.body.small}
  margin-top: 4px;
  resize: none;
  width: 100%;
`;

const WaypointNodeContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>`
  color: white;
  background-color: ${({ bgColor }) => bgColor};
  padding: 12px;
  border-radius: 12px;
  min-width: 350px;
  transition: background-color 0.3s ease;
`;

const HorizontalLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IconPlaceholder = styled.div`
  background-color: white;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  cursor: pointer;
`;

export default WaypointNode;
