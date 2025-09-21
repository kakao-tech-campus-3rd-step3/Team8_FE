import { useLayoutEffect, useRef, useState } from 'react';

export const useAutosizeInput = (value: string) => {
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
      setWidth(span.offsetWidth + 10);
      document.body.removeChild(span);
    }
  }, [value]);

  return { ref, style: { width: `${width}px` } };
};