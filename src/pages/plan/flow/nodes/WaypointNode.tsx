import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import { categoryStyles, locationCategories } from '@/pages/plan/utils/Category';
import { useAutosizeInput } from '../../hooks/useAutosizeInput';
import { CustomTimeInput } from './CustomTimeInput';
import { defaultWaypointData, type WaypointNodeData } from '../canvasComponents/Waypoint';

function WaypointNode(props: any) {
  const localStorageKey = `waypoint-data-${props.id}`;

  // 2. localStorage와 defaultWaypointData를 사용해 초기 상태를 설정하는 함수
  const getInitialState = (): WaypointNodeData => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        ...defaultWaypointData,
        ...parsedData,
        startTime: parsedData.startTime ? new Date(parsedData.startTime) : defaultWaypointData.startTime,
        endTime: parsedData.endTime ? new Date(parsedData.endTime) : defaultWaypointData.endTime,
      };
    }
    return defaultWaypointData;
  };

  // 3. 여러 개의 state를 하나의 객체로 통합
  const [data, setData] = useState<WaypointNodeData>(getInitialState);
  const [isCategorySelectorOpen, setCategorySelectorOpen] = useState(false);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  // 4. data 객체가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, [data, localStorageKey]);

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

  const titleProps = useAutosizeInput(data.title);
  const descriptionProps = useAutosizeInput(data.description);

  // 5. 이벤트 핸들러가 data 객체를 업데이트하도록 수정
  const handleDataChange = (field: keyof WaypointNodeData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    handleDataChange('category', selectedCategory);
    setCategorySelectorOpen(false);
  };

  return (
    <WaypointNodeContainer bgColor={categoryStyles[data.category].color}>
      <HorizontalLayout>
        <IconWrapper ref={iconWrapperRef}>
          <IconPlaceholder onClick={() => setCategorySelectorOpen((prev) => !prev)}>
            {categoryStyles[data.category].icon}
          </IconPlaceholder>
          {isCategorySelectorOpen && (
            <CategoryDropdown>
              {locationCategories.map((cat) => (
                <CategoryItem key={cat} onClick={() => handleCategoryChange(cat)}>
                  {categoryStyles[cat].icon} {cat}
                </CategoryItem>
              ))}
            </CategoryDropdown>
          )}
        </IconWrapper>
        <VerticalLayout>
          {/* 6. UI 요소들이 data state를 사용하도록 바인딩 수정 */}
          <Title
            as="input"
            type="text"
            value={data.title}
            onChange={(e) => handleDataChange('title', e.target.value)}
            className="nodrag"
            {...titleProps}
          />
          <HorizontalLayout>
            <Description
              as="input"
              type="text"
              value={data.description}
              onChange={(e) => handleDataChange('description', e.target.value)}
              className="nodrag"
              {...descriptionProps}
            />
            <TimeWrapper>
              <DatePicker
                selected={data.startTime}
                onChange={(date: Date | null) => handleDataChange('startTime', date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="HH:mm"
                customInput={<CustomTimeInput />}
              />
              ~
              <DatePicker
                selected={data.endTime}
                onChange={(date: Date | null) => handleDataChange('endTime', date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="HH:mm"
                customInput={<CustomTimeInput />}
              />
            </TimeWrapper>
          </HorizontalLayout>
          <MemoTextarea
            placeholder="메모..."
            className="nodrag"
            value={data.memo}
            onChange={(e) => handleDataChange('memo', e.target.value)}
          />
        </VerticalLayout>
      </HorizontalLayout>
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

const Title = styled.div`
  ${fontSystem.title.xlarge}
  ${BaseInputStyles}
`;

const Description = styled.div`
  ${fontSystem.body.small}
  ${BaseInputStyles}
`;

const MemoTextarea = styled.textarea`
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
