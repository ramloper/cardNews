import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export default function MainLayout() {
    const isScrollingDown = useScrollDirection();

    return (
        <div className="flex w-full min-h-screen bg-[#fafafa] dark:bg-gray-900">
            {/* 모바일/태블릿 헤더 */}
            <div className={`fixed top-0 left-0 right-0 lg:hidden transition-transform duration-300 z-50 ${isScrollingDown ? '-translate-y-full' : 'translate-y-0'
                }`}>
                <Header />
            </div>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden lg:block fixed top-0 left-0 h-full xl:w-[244px] w-[100px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
                <Navigation />
            </nav>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 lg:ml-[80px] xl:ml-[244px] mt-[40px] lg:mt-0">
                <Outlet />
            </main>

            {/* 모바일/태블릿 하단 네비게이션 */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-[60px] border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
                <Navigation />
            </nav>
        </div>
    );
}