import { useEffect, useState } from 'react';
import { getBoundClientRect } from '../../util';
import { ScreenDimension } from '../useMediaQuery/core/types';

const useResizeObserver = (ref: React.RefObject<HTMLElement>) => {
  const [dimension, setDimension] = useState<ScreenDimension>(() => {
    if (!ref.current) return { width: 0, height: 0 };
    const { height, width } = getBoundClientRect(ref.current);
    return { height, width };
  });

  useEffect(() => {
    if (!ref.current) return;
    const currentElement = ref.current;
    const observer = new ResizeObserver(() => {
      const nextBoundRect = getBoundClientRect(currentElement);
      if (
        nextBoundRect.width !== dimension.width ||
        nextBoundRect.height !== dimension.height
      ) {
        setDimension({
          width: nextBoundRect.width,
          height: nextBoundRect.height,
        });
      }
    });
    observer.observe(currentElement);
    return () => observer.observe(currentElement);
  }, [ref.current]);

  return dimension;
};

export { useResizeObserver };
