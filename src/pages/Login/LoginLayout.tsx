import { Outlet } from 'react-router-dom';

export default function LoginLayout() {
    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-[#fafafa] dark:bg-gray-900'>
            <div className='w-full max-w-sm mx-auto px-4'>
                <Outlet />
            </div>
        </div>
    );
} 