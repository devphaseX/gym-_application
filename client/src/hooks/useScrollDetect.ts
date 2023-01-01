import { captureUpdateFunctionState } from '@/util';
import { useMemo } from 'react';
import { RefObject } from 'react';
import { MutableRefObject, useState } from 'react';
import { useEffect } from 'react';

interface useStickyNavigationDetectProps {
  ref: MutableRefObject<HTMLElement> | RefObject<HTMLElement>;
  assumeTop?: boolean;
}

const useStickyNavigationDetect = ({
  ref,
  assumeTop,
}: useStickyNavigationDetectProps) => {
  const [isPageTop, setPageTop] = useState<boolean>(assumeTop ?? false);

  const navHeight = useMemo(() => {
    if (ref.current === null || ref.current === undefined) return;
    return ref.current.getBoundingClientRect().height;
  }, [ref.current]);

  useEffect(() => {
    const abort = new AbortController();

    async function onScroll() {
      if (navHeight === undefined) return;
      const scrollY = window.scrollY;

      const scollYRatio = scrollY / document.body.scrollHeight;
      const pageYOffset = scollYRatio * document.body.clientHeight;
      const match = pageYOffset > navHeight;
      if (match !== (await captureUpdateFunctionState(setPageTop))) {
        setPageTop(pageYOffset > navHeight);
      }
    }
    window.addEventListener('scroll', onScroll, { signal: abort.signal });
    window.scrollBy({ top: 1 });
    window.scroll({ top: -1 });
    return () => abort.abort();
  }, [ref.current]);

  return isPageTop;
};

export { useStickyNavigationDetect };
