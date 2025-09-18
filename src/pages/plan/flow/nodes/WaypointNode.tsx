import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import React, { useState, useLayoutEffect, useRef, forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// input 너비를 동적으로 조절하는 커스텀 훅
const useAutosizeInput = (value: string) => {
  const ref = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const span = document.createElement('span');
      span.style.font = window.getComputedStyle(ref.current).font;
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.textContent = value || ref.current.placeholder;
      document.body.appendChild(span);
      setWidth(span.offsetWidth + 10); // 여백 추가
      document.body.removeChild(span);
    }
  }, [value]);

  return { ref, style: { width: `${width}px` } };
};

// DatePicker의 customInput을 위한 컴포넌트
const CustomTimeInput = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void }>(({ value, onClick }, ref) => (
  <TimeDisplay onClick={onClick} ref={ref}>
    {value}
  </TimeDisplay>
));
CustomTimeInput.displayName = 'CustomTimeInput';

function WaypointNode(props: any) {
    // 컴포넌트별 고유 키 생성
  const localStorageKey = `waypoint-data-${props.id}`;

  // localStorage에서 초기 데이터 불러오기
  const getInitialState = () => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        title: parsedData.title || '장소',
        description: parsedData.description || '상세주소',
        startTime: parsedData.startTime ? new Date(parsedData.startTime) : new Date(0, 0, 0, 10, 22),
        endTime: parsedData.endTime ? new Date(parsedData.endTime) : new Date(0, 0, 0, 12, 22),
        memo: parsedData.memo || '',
      };
    }
    return {
        title: '장소',
        description: '상세주소',
        startTime: new Date(0, 0, 0, 10, 22),
        endTime: new Date(0, 0, 0, 12, 22),
        memo: '',
    };
  };

  const [title, setTitle] = useState(getInitialState().title);
  const [description, setDescription] = useState(getInitialState().description);
  const [startTime, setStartTime] = useState<Date | null>(getInitialState().startTime);
  const [endTime, setEndTime] = useState<Date | null>(getInitialState().endTime);
  const [memo, setMemo] = useState(getInitialState().memo);

  // 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    const dataToSave = {
      title,
      description,
      startTime: startTime,
      endTime: endTime,
      memo,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
  }, [title, description, startTime, endTime, memo, localStorageKey]);


  const titleProps = useAutosizeInput(title);
  const descriptionProps = useAutosizeInput(description);

  return (
    <WaypointNodeContainer>
      <HorizontalLayout>
        <IconPlaceholder />
        <VerticalLayout>
          <Title
            as="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="nodrag"
            {...titleProps}
          />
          <HorizontalLayout>
            <Description
              as="input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="nodrag"
              {...descriptionProps}
            />
            <TimeWrapper>
              <DatePicker
                selected={startTime}
                onChange={(date: Date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="HH:mm"
                customInput={<CustomTimeInput />}
              />
              ~
              <DatePicker
                selected={endTime}
                onChange={(date: Date) => setEndTime(date)}
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
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </VerticalLayout>
      </HorizontalLayout>
    </WaypointNodeContainer>
  );
}

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;

  /* react-datepicker 커스텀 스타일 */
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

const TimeDisplay = styled.button`
  ${fontSystem.title.large}
  color: white;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
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

const WaypointNodeContainer = styled.div`
  color: white;
  background-color: ${colorSystem.tertiary_white._700};
  padding: 12px;
  border-radius: 12px;
  min-width: 350px;
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
`;

export default WaypointNode;