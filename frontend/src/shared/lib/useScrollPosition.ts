'use client';

import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from './useDebounce';

export const useScrollPosition = (heightScroll: number = 0): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > heightScroll) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [ heightScroll ]);

  const throttledHandleScroll = useDebounce(handleScroll, 100);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll, throttledHandleScroll]);

  return isScrolled;
};
