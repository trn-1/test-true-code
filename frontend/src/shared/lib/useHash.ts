import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useDebounce } from '@/shared/lib/useDebounce';

export const useHash = (): string => {
  const [hash, setHash] = useState('');

  const path = usePathname();
  const onHashChange = (): void => {
    setHash(window?.location ? window.location.hash : '');
  };

  const debouncedHashChange = useDebounce(onHashChange, 50);

  useEffect(() => {
    if (path !== '/') {
      return;
    }

    onHashChange();

    window.addEventListener('scroll', debouncedHashChange);
    return () => {
      window.removeEventListener('scroll', debouncedHashChange);
    };
  }, [debouncedHashChange, path]);

  return path === '/' ? hash : '';
};
