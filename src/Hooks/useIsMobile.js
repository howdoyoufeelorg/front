import { useState, useEffect } from 'react';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(null);

    const handleWindowSizeChange = () => {
        // CSS-like conditions can be made using window.matchMedia, if needed
        window.innerWidth <= 500 ? setIsMobile(true) : setIsMobile(false)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    });

    return isMobile;
}