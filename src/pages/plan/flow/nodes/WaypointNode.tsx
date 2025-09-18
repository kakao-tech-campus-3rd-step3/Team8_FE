import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import React, { useState, forwardRef, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { categoryStyles, locationCategories } from './categoryStyles';
import { useAutosizeInput } from './hooks';
import { CustomTimeInput } from './CustomTimeInput';

function WaypointNode(props: any) {
  const localStorageKey = `waypoint-data-${props.id}`;

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
        category: parsedData.category || 'Default',
      };
    }
    return {
        title: '장소',
        description: '상세주소',
        startTime: new Date(0, 0, 0, 10, 22),
        endTime: new Date(0, 0, 0, 12, 22),
        memo: '',
        category: 'Default',
    };
  };

  const [title, setTitle] = useState(getInitialState().title);
  const [description, setDescription] = useState(getInitialState().description);
  const [startTime, setStartTime] = useState<Date | null>(getInitialState().startTime);
  const [endTime, setEndTime] = useState<Date | null>(getInitialState().endTime);
  const [memo, setMemo] = useState(getInitialState().memo);
  const [category, setCategory] = useState(getInitialState().category);
  const [isCategorySelectorOpen, setCategorySelectorOpen] = useState(false);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dataToSave = { title, description, startTime, endTime, memo, category };
    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
  }, [title, description, startTime, endTime, memo, category, localStorageKey]);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (iconWrapperRef.current && !iconWrapperRef.current.contains(event.target as Node)) {
            setCategorySelectorOpen(false);
        }
    }
    if (isCategorySelectorOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategorySelectorOpen]);

  const titleProps = useAutosizeInput(title);
  const descriptionProps = useAutosizeInput(description);
  
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setCategorySelectorOpen(false);
  };

  return (
    <WaypointNodeContainer bgColor={categoryStyles[category].color}>
      <HorizontalLayout>
        <IconWrapper ref={iconWrapperRef}>
            <IconPlaceholder onClick={() => setCategorySelectorOpen(prev => !prev)}>
                {categoryStyles[category].icon}
            </IconPlaceholder>
            {isCategorySelectorOpen && (
                 <CategoryDropdown>
                    {locationCategories.map(cat => 
                        <CategoryItem key={cat} onClick={() => handleCategoryChange(cat)}>
                            {categoryStyles[cat].icon} {cat}
                        </CategoryItem>
                    )}
                 </CategoryDropdown>
            )}
        </IconWrapper>
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

const WaypointNodeContainer = styled.div<{ bgColor: string }>`
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