import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onlyNumber, onlyString } from '../../function/regex';
import { myToast } from '../../lib/alert';
import { loginAction, setAccessToken, adminCheck } from '../../lib/login';
export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentId: '',
        memberName: '',
        password: ''
    });
    const [shakeInputs, setShakeInputs] = useState({
        studentId: false,
        memberName: false
    });

    // 폼 유효성 검사
    const isFormValid = useMemo(() => {
        return formData.studentId.trim() !== '' &&
            formData.memberName.trim() !== '' &&
            formData.password.trim() !== '';
    }, [formData.studentId, formData.memberName, formData.password]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginAction(formData)
            .then((res: any) => {
                const accessToken = res.data.data;
                setAccessToken(accessToken);
                adminCheck(formData);
                myToast('로그인 성공', 'success');
                setTimeout(() => {
                    navigate("/", { replace: true })
                }, 100);

            })
            .catch((error: any) => {
                myToast(error.response.data.data.value, 'error')
            })

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // 학번 유효성 검사
        if (name === 'studentId' && value !== '' && !/^\d*$/.test(value)) {
            setShakeInputs(prev => ({ ...prev, studentId: true }));
            setTimeout(() => setShakeInputs(prev => ({ ...prev, studentId: false })), 500);
        }

        // 이름 유효성 검사 (한글만 허용)
        if (name === 'memberName' && value !== '' && !/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]*$/.test(value)) {
            setShakeInputs(prev => ({ ...prev, memberName: true }));
            setTimeout(() => setShakeInputs(prev => ({ ...prev, memberName: false })), 500);
        }

        setFormData(prev => ({
            ...prev,
            [name]: name === 'studentId' ? onlyNumber(value)
                : name === 'memberName' ? onlyString(value)
                    : value
        }));
    };
    useEffect(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('admin');

    }, [])

    return (
        <>
            <style>
                {`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .shake {
                    animation: shake 0.2s ease-in-out 0s 2;
                }
                `}
            </style>

            {/* 로그인 폼 */}
            <div className='bg-white dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-serif mb-4'>영선 Artgram</h1>
                </div>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <input
                            id='studentId'
                            name='studentId'
                            type='text'
                            required
                            value={formData.studentId}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 dark:text-white ${shakeInputs.studentId ? 'shake' : ''}`}
                            placeholder='학번'
                        />
                    </div>
                    <div>
                        <input
                            id='memberName'
                            name='memberName'
                            type='text'
                            required
                            value={formData.memberName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 dark:text-white ${shakeInputs.memberName ? 'shake' : ''}`}
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

                    <button
                        type='submit'
                        disabled={!isFormValid}
                        className={`w-full py-2 rounded font-semibold text-sm text-white transition-colors
                            ${isFormValid
                                ? 'bg-[#0095f6] hover:bg-[#1877f2]'
                                : 'bg-[#0095f6]/40 cursor-not-allowed'}`}
                    >
                        로그인
                    </button>
                </form>

                {/* <div className='mt-4 text-center'>
                    <button className='text-xs text-[#00376b] dark:text-blue-400'>
                        비밀번호를 잊으셨나요?
                    </button>
                </div> */}
            </div>

            {/* 계정 생성 링크 */}
            <div className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 text-center mt-4'>
                <p className='text-sm'>
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className='text-[#0095f6] font-semibold'>
                        가입하기
                    </Link>
                </p>
            </div>
        </>
    );
}