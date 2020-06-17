//@flow
import { useState, useEffect } from 'react';

const smallMobileCondition = () => {
  // CSS-like conditions can be made using window.matchMedia, if needed
  return window.innerWidth <= 320;
};

const mobileCondition = () => {
  // CSS-like conditions can be made using window.matchMedia, if needed
  return window.innerWidth <= 500;
};

export const useIsMobile = (): { isMobile: boolean, isSmallMobile: boolean } => {
  const [isMobile, setIsMobile] = useState(mobileCondition());
  const [isSmallMobile, setIsSmallMobile] = useState(smallMobileCondition());

  const handleWindowSizeChange = () => {
    mobileCondition() ? setIsMobile(true) : setIsMobile(false);
    smallMobileCondition() ? setIsSmallMobile(true) : setIsSmallMobile(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  });

  return { isSmallMobile, isMobile };
};
