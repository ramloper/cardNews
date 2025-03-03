import { useState, useEffect } from 'react';

export function useScrollDirection() {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollY = window.scrollY;

            setIsScrollingDown(scrollY > lastScrollY && scrollY > 10);
            setLastScrollY(scrollY);
        };

        window.addEventListener('scroll', updateScrollDirection);

        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
        };
    }, [lastScrollY]);

    return isScrollingDown;
} 