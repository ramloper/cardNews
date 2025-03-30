import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { deleteNoticeAction, getNotices, registerNoticeAction } from '../../lib/notice';
import { myToast } from '../../lib/alert';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NoticeType } from '../../types/notice';
import Skeleton from 'react-loading-skeleton';
const NoticeWrite = () => {
    const queryClient = useQueryClient();
    const [isWriting, setIsWriting] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const notice: NoticeType = {
            title,
            content
        }
        registerNoticeAction(notice)
            .then(() => {
                myToast('공지사항 등록 성공', 'success');
                setTitle('');
                setContent('');
                setIsWriting(false);
                queryClient.invalidateQueries({ queryKey: ['notices'] });
            })
            .catch(() => {
                myToast('공지사항 등록 실패', 'error');
            })
    };
    const deleteNotice = (noticeId: number) => {
        deleteNoticeAction(noticeId)
            .then(() => {
                myToast('공지사항 삭제 성공', 'success');
                queryClient.invalidateQueries({ queryKey: ['notices'] });
            })
            .catch(() => {
                myToast('공지사항 삭제 실패', 'error');
            })
    }
    const { data: notices, isLoading, error } = useQuery({
        queryKey: ['notices'],
        queryFn: getNotices,
    });
    if (isLoading) {
        return (<div className="max-w-[935px] mx-auto py-4 px-2">
            <div className="w-full xl:w-[600px] h-full">
                <Skeleton circle width={40} height={40} className="mr-3" />
            </div>
        </div>);
    }

    if (error) {
        return <div className="flex justify-center p-4">Error loading posts</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* 공지사항 헤더 */}
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-bold dark:text-white">공지사항</h2>
                <button
                    onClick={() => setIsWriting(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
                >
                    작성
                </button>
            </div>

            {/* 공지사항 리스트 */}
            <div className="p-4">
                <div className="space-y-4">
                    {notices?.map((notice: NoticeType) => (
                        <div className="border-b dark:border-gray-700 pb-2 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold dark:text-white">{notice.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{notice.content}</p>
                            </div>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm' onClick={() => deleteNotice(notice.noticeId ?? 0)}>삭제</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 공지사항 작성 모달 */}
            {isWriting && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-[500px] max-w-[90%]">
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                            <h2 className="text-lg font-bold dark:text-white">공지사항 작성</h2>
                            <button
                                onClick={() => setIsWriting(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        제목
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        내용
                                    </label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        등록
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoticeWrite;