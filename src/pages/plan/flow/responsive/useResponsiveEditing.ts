import { useEffect, useMemo, useState } from 'react';
import { EDIT_MIN_WIDTH, isEditingAllowed } from './breakpoints';

// breakpoint의 변화에 따라 편집 가능여부를 알려줍니다
export const useResponsiveEditing = (minWidth: number = EDIT_MIN_WIDTH) => {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : minWidth
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWidth(window.innerWidth);
    const mql = window.matchMedia(`(min-width: ${minWidth}px)`);

    if (mql.addEventListener) {
      const onChange = () => handleResize();
      mql.addEventListener('change', onChange);
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        mql.removeEventListener('change', onChange);
        window.removeEventListener('resize', handleResize);
      };
    } else {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [minWidth]);

  const canEdit = useMemo(() => isEditingAllowed(width, minWidth), [width, minWidth]);

  return { canEdit, width } as const;
};
