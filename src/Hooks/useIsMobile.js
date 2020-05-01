import { useState, useEffect } from 'react';

const mobileCondition = () => {
    // CSS-like conditions can be made using window.matchMedia, if needed
    return window.innerWidth <= 500;
}

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(mobileCondition());

    const handleWindowSizeChange = () => {
        mobileCondition() ? setIsMobile(true) : setIsMobile(false)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    });

    return isMobile;
}