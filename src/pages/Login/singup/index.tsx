import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { onlyNumber, onlyString } from '../../../function/regex';

export default function Signup() {
    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        password: '',
        confirmPassword: '',
        profileImage: null as File | null
    });
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profileImage: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            {/* 회원가입 폼 */}
            <div className='bg-white dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-serif mb-4'>영선 Artgram</h1>
                </div>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* 프로필 이미지 업로드 */}
                    <div className='flex flex-col items-center mb-6'>
                        <div
                            onClick={handleImageClick}
                            className='w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 cursor-pointer overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:opacity-80 transition-opacity'
                        >
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500'>
                                    <span>프로필 사진</span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div>
                        <input
                            id='studentId'
                            name='studentId'
                            type='text'
                            required
                            value={onlyNumber(formData.studentId)}
                            onChange={handleChange}
                            className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 dark:text-white'
                            placeholder='학번'
                        />
                    </div>
                    <div>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            required
                            value={onlyString(formData.name)}
                            onChange={handleChange}
                            className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 dark:text-white'
                            placeholder='이름'
                        />
                    </div>
                    <div>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 dark:text-white'
                            placeholder='비밀번호'
                        />
                    </div>
                    <div>
                        <input
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 dark:text-white'
                            placeholder='비밀번호 확인'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-[#0095f6] hover:bg-[#1877f2] text-white py-2 rounded font-semibold text-sm'
                    >
                        가입하기
                    </button>
                </form>
            </div>

            {/* 로그인 링크 */}
            <div className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 text-center mt-4'>
                <p className='text-sm'>
                    계정이 있으신가요?{' '}
                    <Link to="/login" className='text-[#0095f6] font-semibold'>
                        로그인
                    </Link>
                </p>
            </div>
        </>
    );
}