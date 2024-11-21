'use client';

import { useEffect, useState } from 'react';

export const useNavbarHeight = (): number => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById('header');

    const handleNavbarHeight = (): void => {
      if (navbar) {
        setNavbarHeight(navbar.clientHeight);
      }
    };

    handleNavbarHeight();

    window.addEventListener('resize', handleNavbarHeight);
    return () => {
      window.removeEventListener('resize', handleNavbarHeight);
    };
  }, []);

  return navbarHeight;
};
