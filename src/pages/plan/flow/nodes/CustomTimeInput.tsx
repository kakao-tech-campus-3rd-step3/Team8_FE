import { forwardRef } from 'react';
import styled from 'styled-components';
import { fontSystem } from '@/styles/fontSystem';

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

export const CustomTimeInput = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void }>(({ value, onClick }, ref) => (
    <TimeDisplay onClick={onClick} ref={ref}>
      {value}
    </TimeDisplay>
));
CustomTimeInput.displayName = 'CustomTimeInput';