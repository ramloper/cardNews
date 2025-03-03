import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ThumbnailType } from '../../types/thumbnail';
import { useEffect, useCallback, useState } from 'react';
import { title } from 'process';

interface DetailProps {
    id: number;
    onClose: () => void;
}

const mockData = {
    id: 1,
    img: ['/img/salgu1.jpg', '/img/salgu2.jpg'],
    memberName: "제제",
    title: "타이틀",
    content: "여기 내용이 들어감",
    likeCount: 10,
}

export default function Detail({ id, onClose }: DetailProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // ESC 키 이벤트 핸들러
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    // 모달 외부 클릭 핸들러
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // 이미지 슬라이드 핸들러
    const handleSlide = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setCurrentIndex(prev =>
                prev === 0 ? mockData.img.length - 1 : prev - 1
            );
        } else {
            setCurrentIndex(prev =>
                prev === mockData.img.length - 1 ? 0 : prev + 1
            );
        }
    };

    // 터치 이벤트 핸들러
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                handleSlide('next');
            } else {
                handleSlide('prev');
            }
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    // ESC 키 이벤트 리스너 등록/해제
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:opacity-80"
            >
                <XMarkIcon className="w-8 h-8" />
            </button>

            <div className="max-w-6xl w-full bg-white dark:bg-gray-800 flex h-[80vh]">
                {/* 왼쪽: 이미지 섹션 */}
                <div className="relative w-[65%] bg-black">
                    <div
                        className="h-full flex items-center justify-center overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                                width: `${mockData.img.length * 100}%`
                            }}
                        >
                            {mockData.img.map((img, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 flex justify-center"
                                >
                                    <img
                                        src={img}
                                        alt={`post-${index + 1}`}
                                        className="max-h-[80vh] max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {mockData.img.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80"
                                onClick={() => handleSlide('prev')}
                            >
                                <ChevronLeftIcon className="w-8 h-8" />
                            </button>
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80"
                                onClick={() => handleSlide('next')}
                            >
                                <ChevronRightIcon className="w-8 h-8" />
                            </button>
                        </>
                    )}
                </div>

                {/* 오른쪽: 정보 섹션 */}
                <div className="w-[35%] flex flex-col border-l dark:border-gray-700">
                    {/* 헤더 */}
                    <div className="p-4 border-b dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            <span className="font-semibold dark:text-white">{mockData.memberName}</span>
                        </div>
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <h2 className="text-xl font-bold mb-2 dark:text-white">{mockData.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{mockData.content}</p>
                    </div>

                    {/* 좋아요 섹션 */}
                    <div className="p-4 border-t dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <button className="hover:opacity-80">
                                <HeartIcon className="w-7 h-7 dark:text-white" />
                            </button>
                            <span className="font-semibold dark:text-white">좋아요 {mockData.likeCount}개</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 