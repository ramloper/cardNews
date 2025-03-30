import { XMarkIcon } from '@heroicons/react/24/solid';
import { PhotoIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useRef, useState, useEffect } from 'react';
import { registerPostAction } from '../../lib/post';
import { myToast } from '../../lib/alert';
import { useQueryClient } from '@tanstack/react-query';

interface RegisterProps {
    onClose: () => void;
}

type Step = 'select' | 'write';

const Register = ({ onClose }: RegisterProps) => {
    const queryClient = useQueryClient();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState<Step>('select');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const MAX_FILES = 20;

    // 모달 마운트/언마운트 시 body 스크롤 제어
    useEffect(() => {
        // 모달이 열릴 때 body 스크롤 막기
        document.body.style.overflow = 'hidden';

        // 모달이 닫힐 때 원래대로 복구
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (selectedFiles.length + files.length > MAX_FILES) {
            alert(`최대 ${MAX_FILES}개의 파일만 선택할 수 있습니다.`);
            return;
        }

        // 파일 목록 업데이트
        setSelectedFiles(prev => [...prev, ...files]);

        // 미리보기 URL 생성
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    // 컴포넌트 언마운트 시 미리보기 URL 정리
    const cleanup = () => {
        previews.forEach(url => URL.revokeObjectURL(url));
    };

    const handleSubmit = () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        registerPostAction(formData)
            .then(() => {
                myToast('카드뉴스 등록 성공', 'success');
                queryClient.invalidateQueries({ queryKey: ['posts'] });
                cleanup();
                onClose();
            })
            .catch((error: any) => {
                myToast(error.response.data.data.value, 'error');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* 헤더 - 고정 */}
                <div className="border-b dark:border-gray-700 p-4 text-center relative flex-shrink-0">
                    <h2 className="font-semibold dark:text-white">새 게시물 만들기</h2>
                    <button
                        onClick={() => {
                            cleanup();
                            onClose();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:opacity-80"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* 컨텐츠 - 스크롤 가능 */}
                <div className="flex-1 overflow-y-auto">
                    {currentStep === 'select' ? (
                        // 파일 선택 단계
                        <div className="p-8 min-h-[400px] flex items-center justify-center">
                            {selectedFiles.length === 0 ? (
                                // 파일 선택 전 화면
                                <div className="text-center space-y-6">
                                    <div className="flex justify-center">
                                        <PhotoIcon className="w-24 h-24 text-gray-400" />
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-6 py-2.5 rounded-lg font-semibold"
                                    >
                                        사진 선택
                                    </button>
                                </div>
                            ) : (
                                // 파일 선택 후 미리보기 화면
                                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-max">
                                    {previews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="aspect-square relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                                        >
                                            <img
                                                src={preview}
                                                alt={`preview-${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                    {selectedFiles.length < MAX_FILES && (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <PlusIcon className="w-8 h-8 text-gray-400" />
                                        </button>
                                    )}
                                </div>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                        </div>
                    ) : (
                        // 글 작성 단계
                        <div className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        제목
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="제목을 입력하세요"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        내용
                                    </label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full h-60 px-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                                        placeholder="내용을 입력하세요"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 하단 버튼 - 고정 */}
                <div className="border-t dark:border-gray-700 p-4 flex justify-between flex-shrink-0">
                    {currentStep === 'select' ? (
                        <div className="flex justify-end w-full">
                            <button
                                onClick={() => setCurrentStep('write')}
                                disabled={selectedFiles.length === 0}
                                className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                다음
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => setCurrentStep('select')}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-semibold"
                            >
                                이전
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!title.trim() || !content.trim()}
                                className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                등록
                            </button>
                        </>
                    )}
                </div>
            </div>
            {/* 로딩 스피너 */}
            {isSubmitting && <LoadingSpinner />}
        </div>
    );
}
export default Register;
const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">업로드 중...</p>
        </div>
    </div>
);