import { useState } from 'react';
import { ThumbnailType } from '../../types/thumbnail';
import Thumbnail from '../../components/Thumbnail';

type TabType = 'posts' | 'likes';

export default function Profile() {
    const [currentTab, setCurrentTab] = useState<TabType>('posts');

    // 임시 데이터
    const userInfo = {
        studentId: "20231111",
        name: "김우람",
        profileImage: "/img/salgu1.jpg"
    };

    const posts: ThumbnailType[] = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        img: Math.random() > 0.5 ? '/img/salgu1.jpg' : '/img/salgu2.jpg',
        imgCount: Math.random() > 0.5 ? 1 : 2,
    }));

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-8">
            {/* 프로필 섹션 */}
            <div className="flex items-center gap-8 mb-12">
                {/* 프로필 이미지 */}
                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src={userInfo.profileImage}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 사용자 정보 */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold dark:text-white">{userInfo.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{userInfo.studentId}</p>
                </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="border-t dark:border-gray-700">
                <div className="flex">
                    <button
                        className={`flex-1 py-4 text-sm font-semibold border-t-2 ${currentTab === 'posts'
                                ? 'border-black dark:border-white text-black dark:text-white'
                                : 'border-transparent text-gray-500'
                            }`}
                        onClick={() => setCurrentTab('posts')}
                    >
                        게시물
                    </button>
                    <button
                        className={`flex-1 py-4 text-sm font-semibold border-t-2 ${currentTab === 'likes'
                                ? 'border-black dark:border-white text-black dark:text-white'
                                : 'border-transparent text-gray-500'
                            }`}
                        onClick={() => setCurrentTab('likes')}
                    >
                        좋아요
                    </button>
                </div>
            </div>

            {/* 게시물 그리드 */}
            <div className="grid grid-cols-3 gap-1 mt-4">
                {posts.map((item) => (
                    <Thumbnail key={item.id} imgObject={item} />
                ))}
            </div>
        </div>
    );
} 