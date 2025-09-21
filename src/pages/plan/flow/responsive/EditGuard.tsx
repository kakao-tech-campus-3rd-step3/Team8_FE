import styled from 'styled-components';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import type { ReactNode } from 'react';

// 편집 제한 가드 (읽기 전용 안내 배지만 표시, 상호작용은 차단하지 않음)
type EditGuardProps = {
  enabled: boolean; // true일 때 읽기 전용 배지 노출
  message?: string;
  children: ReactNode;
};

export default function EditGuard({ enabled, message, children }: EditGuardProps) {
  return (
    <GuardWrapper>
      {children}
      {/* 읽기 전용 상태에서는 배지만 띄우고, 포인터 이벤트는 막지 않습니다. */}
      {enabled && <HintBadge>{message ?? '모바일 화면에서는 편집이 제한됩니다'}</HintBadge>}
    </GuardWrapper>
  );
}

const GuardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HintBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  ${fontSystem.body.medium}
  color: ${colorSystem.tertiary_white._0};
  background: ${colorSystem.tertiary_white._700};
  border-radius: 999px;
  padding: 6px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  user-select: none;
`;
