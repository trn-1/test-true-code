'use client';

import { MutableRefObject, useEffect, useState } from 'react';

export const useIntersectionObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  threshold = 0.3,
  cb?: () => void,
): {
isIntersecting: boolean
  } => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observerHandler = (entries: IntersectionObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }
    const [ entry ] = entries;

    setIsIntersecting(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerHandler, {
      root: null,
      rootMargin: '0px',
      threshold,
    });
    const refCurrent = ref?.current;

    if (refCurrent) {
      observer.observe(refCurrent);
    }

    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, [ref, cb, threshold]);

  return {
    isIntersecting
  };
};
