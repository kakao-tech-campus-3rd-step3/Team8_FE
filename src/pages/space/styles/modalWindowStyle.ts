import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import { styled } from 'styled-components';

export const WindowTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WindowTitle = styled.div`
  ${fontSystem.title.medium}
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ModalWindowWrapper = styled.div`
  background-color: ${colorSystem.tertiary_white._0};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ControlBar = styled.div`
  display: flex;
  gap: 8px;
  min-width: 300px;
`;

export const CompleteButton = styled.button`
  flex: 2;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${colorSystem.primary_yellow._500};
  background-color: ${colorSystem.tertiary_white._0};
  cursor: pointer;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${colorSystem.tertiary_white._900};
  background-color: ${colorSystem.tertiary_white._0};
  cursor: pointer;
`;
