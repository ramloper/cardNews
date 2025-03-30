import { HeartIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, } from '@heroicons/react/24/solid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { deleteLike, getPostDetail, postComment, postLike } from '../../lib/post';
import { formatDate } from '../../lib/function';
import { toast } from 'react-toastify';
interface DetailProps {
    id: number;
    onClose: () => void;
}



export default function Detail({ id, onClose }: DetailProps) {
    const queryClient = useQueryClient()
    const [comment, setComment] = useState('')
    const { data: post, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostDetail(id),
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // 모달이 열릴 때 body 스크롤 막기
    useEffect(() => {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY;

        // body에 스크롤 막기 스타일 적용
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // 컴포넌트가 언마운트될 때 스크롤 복원
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

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
                prev === 0 ? (post?.images.length ?? 0) - 1 : prev - 1
            );
        } else {
            setCurrentIndex(prev =>
                prev === (post?.images.length ?? 0) - 1 ? 0 : prev + 1
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
    const onSubmitComment = (e: React.FormEvent) => {
        e.preventDefault(); // 폼 제출 시 새로고침 방지

        if (!comment.trim()) return; // 빈 댓글 방지

        postComment(id, comment)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['posts'] });
                queryClient.invalidateQueries({ queryKey: ['post', id] }); // 특정 게시물의 쿼리만 무효화
                setComment(''); // 댓글 입력창 초기화
                toast.success('댓글이 등록되었습니다.');
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || '댓글 등록에 실패했습니다.');
            });
    };
    // ESC 키 이벤트 리스너 등록/해제
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    const likeAction = () => {
        if (post?.isLike) {
            deleteLike(id)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: ['posts'] });
                    queryClient.invalidateQueries({ queryKey: ['post'] })
                    queryClient.invalidateQueries({ queryKey: ['myLikes'] })
                    toast.success('좋아요 취소')
                })
        } else {
            postLike(id)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: ['posts'] });
                    queryClient.invalidateQueries({ queryKey: ['post'] })
                    queryClient.invalidateQueries({ queryKey: ['myLikes'] })
                    toast.success('좋아요')
                })
        }
    }
    if (isLoading) {
        return <div>Loading...</div>; // 또는 스켈레톤 UI
    }
    const comments = post?.comments
        .filter(comment => comment.commentId !== null)
        .map((comment) => ({
            commentId: comment.commentId,
            commentCreateName: comment.commentCreateName,
            commentCreateTime: formatDate(comment.commentCreateTime),
            content: comment.content,
            commentCreateProfileImageUrl: comment.commentCreateProfileImageUrl,
        }));
    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center"
            onClick={handleBackdropClick}
        >
            <div className="w-[90%] bg-white dark:bg-gray-800 flex max-h-[70vh] min-h-[70vh]">
                {/* 왼쪽 섹션 (이미지 + 프로필/좋아요 + 내용) */}
                <div className="w-[60%] flex flex-col">
                    {/* 이미지 섹션 */}
                    <div className="relative h-[50vh] lg:h-[50vh] bg-black">
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
                                    width: `${(post?.images.length ?? 0) * 100}%`
                                }}
                            >
                                {post?.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex-shrink-0 flex justify-center"
                                    >
                                        <img
                                            src={img}
                                            alt={`post-${index + 1}`}
                                            className="max-h-[40vh] lg:max-h-[50vh] w-auto object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {(post?.images.length ?? 0) > 1 && (
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

                    {/* 프로필 및 좋아요 섹션 */}
                    <div className="px-5 py-2 border-b dark:border-gray-700">
                        <div className="flex items-center gap-3 justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                                    <img
                                        src={post?.boardCreateProfileImageUrl}
                                        alt={post?.boardCreateName}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <span className="font-semibold text-sm dark:text-white">{post?.boardCreateName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={likeAction} className="hover:opacity-80">
                                    <HeartIcon className={`w-6 h-6 ${post?.isLike ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`} />
                                </button>
                                <span className="text-sm font-semibold dark:text-white">좋아요 {post?.likeCount}개</span>
                            </div>
                        </div>
                    </div>

                    {/* 타이틀과 컨텐츠 */}
                    <div className="p-5">
                        <h2 className="text-lg font-bold mb-1 dark:text-white">{post?.title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{post?.content}</p>
                    </div>
                </div>

                {/* 오른쪽 섹션 (댓글) */}
                <div className="w-[40%] border-l dark:border-gray-700 flex flex-col">
                    {/* 닫기 버튼 */}
                    <div className="px-5 py-3 border-b dark:border-gray-700 flex justify-end">
                        <button
                            onClick={onClose}
                            className="text-gray-800 dark:text-gray-200 hover:opacity-80"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* 댓글 목록 */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-5 space-y-4">
                            {comments?.map((comment) => (
                                <div key={comment?.commentId} className="flex gap-3">
                                    {/* 프로필 이미지 */}
                                    <div className="flex-shrink-0 w-8 h-8">
                                        <img
                                            src={comment?.commentCreateProfileImageUrl}
                                            alt={comment?.commentCreateName}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>

                                    {/* 댓글 내용 */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline gap-2">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="font-semibold text-xs dark:text-white flex-shrink-0 w-[60px]">
                                                    {comment?.commentCreateName}
                                                </span>
                                                <span className="font-semibold text-xs dark:text-white flex-shrink-0 w-[60px]">
                                                    {comment?.commentCreateTime}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 break-words">
                                                {comment?.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 댓글 입력 */}
                    <div className="px-5 py-4 border-t dark:border-gray-700">
                        <form
                            className="flex items-center gap-3"
                            onSubmit={onSubmitComment}
                        >
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="댓글 달기..."
                                className="flex-1 bg-transparent text-sm dark:text-white focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={!comment.trim()}
                                className="text-[#0095f6] font-semibold text-sm hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                게시
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 