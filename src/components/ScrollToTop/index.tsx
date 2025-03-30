import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // 스크롤 위치에 따라 버튼 표시 여부 결정
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // 최상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed lg:bottom-8 bottom-20 right-8 bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-40"
                    aria-label="Scroll to top"
                >
                    <ChevronUpIcon className="w-6 h-6" />
                </button>
            )}
        </>
    );
} 