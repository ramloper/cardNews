import { HomeIcon, ViewColumnsIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function Navigation() {
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    return (
        <nav className="h-full dark:bg-gray-900">
            {/* PC 네비게이션 */}
            <div className="hidden lg:flex lg:flex-col h-full p-4">
                {/* 로고 */}
                <div className="py-8">
                    <Link to="/" className="text-xl font-bold dark:text-white">
                        <span className="hidden xl:inline">영선 artgram</span>
                        <span className="xl:hidden">영선</span>
                    </Link>
                </div>

                {/* 메뉴 아이템 */}
                <div className="flex flex-col gap-1">
                    <Link to="/" className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <HomeIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span className="hidden xl:inline dark:text-white">홈</span>
                    </Link>
                    <Link to="/grid" className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <ViewColumnsIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span className="hidden xl:inline dark:text-white">그리드</span>
                    </Link>
                    <Link to="/profile" className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-[1px]">
                                <img
                                    src="/img/salgu1.jpg"
                                    alt="profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <span className="hidden xl:inline dark:text-white">프로필</span>
                    </Link>
                </div>

                {/* 다크모드 토글 버튼 */}
                <div className="flex items-center gap-4 p-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={() => setIsDarkMode(!isDarkMode)}
                            className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 relative after:flex after:items-center after:justify-center">
                            <span className="absolute inset-0 flex items-center pointer-events-none">
                                {isDarkMode ? (
                                    <MoonIcon className="h-4 w-4 text-gray-900 absolute left-[6px] top-[6px]" />
                                ) : (
                                    <SunIcon className="h-4 w-4 text-yellow-500 absolute right-[6px] top-[6px]" />
                                )}
                            </span>
                        </div>
                        <span className="hidden xl:inline ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {isDarkMode ? "다크 모드" : "라이트 모드"}
                        </span>
                    </label>
                </div>
            </div>

            {/* 모바일/태블릿 네비게이션 */}
            <div className="lg:hidden flex items-center justify-around w-full h-full px-4">
                <Link to="/" className="p-3">
                    <HomeIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </Link>
                <Link to="/grid" className="p-3">
                    <ViewColumnsIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </Link>
                <Link to="/profile" className="p-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white p-[1px]">
                            <img
                                src="/img/salgu1.jpg"
                                alt="profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                </Link>
                <div className="p-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={() => setIsDarkMode(!isDarkMode)}
                            className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 relative after:flex after:items-center after:justify-center">
                            <span className="absolute inset-0 flex items-center pointer-events-none">
                                {isDarkMode ? (
                                    <MoonIcon className="h-4 w-4 text-gray-900 absolute left-[6px] top-[6px]" />
                                ) : (
                                    <SunIcon className="h-4 w-4 text-yellow-500 absolute right-[6px] top-[6px]" />
                                )}
                            </span>
                        </div>
                    </label>
                </div>
            </div>
        </nav>
    );
} 