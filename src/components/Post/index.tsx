import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useRef, TouchEvent } from 'react';

export default function Post() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);

    // 예시 이미지 배열 (실제 데이터로 교체 필요)
    const images = [
        '/img/salgu1.jpg',
        '/img/salgu2.jpg',
        // ... 더 많은 이미지
    ];

    const nextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        }
    };

    // 터치 이벤트 핸들러
    const handleTouchStart = (e: TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);

        if (slideRef.current) {
            const diff = touchStart - e.targetTouches[0].clientX;
            const translate = -currentImageIndex * 100 - (diff / slideRef.current.offsetWidth) * 100;

            // 처음과 마지막 이미지에서 저항감 추가
            if (
                (currentImageIndex === 0 && diff < 0) ||
                (currentImageIndex === images.length - 1 && diff > 0)
            ) {
                slideRef.current.style.transform = `translateX(${translate / 3}%)`;
            } else {
                slideRef.current.style.transform = `translateX(${translate}%)`;
            }
        }
    };

    const handleTouchEnd = () => {
        const minSwipeDistance = 50;
        const diff = touchStart - touchEnd;

        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }

        // 원래 위치로 복귀
        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(-${currentImageIndex * 100}%)`;
        }
    };

    return (
        <article className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            {/* 포스트 헤더 */}
            <div className="flex items-center p-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white p-[2px]">
                            <img
                                src="/img/salgu1.jpg"
                                alt="profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm dark:text-white">salgu</span>
                    </div>
                </div>
                {/* <button className="ml-auto">
                    <span className="text-2xl">...</span>
                </button> */}
            </div>

            {/* 포스트 이미지 */}
            <div className="relative aspect-square">
                <div className="overflow-hidden h-full">
                    <div
                        ref={slideRef}
                        className="flex transition-transform duration-300 h-full touch-pan-y"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`post-${index + 1}`}
                                className="w-full h-full object-cover flex-shrink-0"
                                draggable={false}
                            />
                        ))}
                    </div>
                </div>

                {/* 네비게이션 버튼 */}
                {currentImageIndex > 0 && (
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-1.5 transition-colors"
                    >
                        <ChevronLeftIcon className="w-5 h-5 text-gray-900" />
                    </button>
                )}
                {currentImageIndex < images.length - 1 && (
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-1.5 transition-colors"
                    >
                        <ChevronRightIcon className="w-5 h-5 text-gray-900" />
                    </button>
                )}

                {/* 인디케이터 dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* 포스트 액션 버튼 */}
            <div className="p-4">
                <div className="flex gap-4">
                    <button>
                        <HeartIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                    <button>
                        <ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <button>
                        <PaperAirplaneIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <button className="ml-auto">
                        <BookmarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <div className="mt-2">
                    <p className="text-sm font-semibold dark:text-white">좋아요 310개</p>
                </div>
                <div className="mt-2">
                    <p className="text-sm dark:text-gray-300">
                        <span className="font-semibold dark:text-white">salgu</span> 살구스타그램
                    </p>
                </div>
                <button className="text-gray-500 text-sm mt-1">댓글 6개 모두 보기</button>
            </div>
        </article>
    );
} 