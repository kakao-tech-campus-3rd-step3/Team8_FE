import { useEffect } from 'react';

export const useBlockScroll = () => {
  useEffect(() => {
    // 백그라운드 스크롤 막기
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // 스크롤 복구
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};
