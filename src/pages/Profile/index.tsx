import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getMemberSimpleInfo } from '../../lib/member';
import { ThumbnailType } from '../../types/thumbnail';
import { MemberSimpleInfoType } from '../../types/member';
import { getMyLikes, getMyPosts } from '../../lib/post';
import { PostType } from '../../types/post';
import Thumbnail from '../../components/Thumbnail';
type TabType = 'posts' | 'likes';

export default function Profile() {
    const [currentTab, setCurrentTab] = useState<TabType>('posts');
    const { data: userInfo, isLoading, error } = useQuery<MemberSimpleInfoType>({
        queryKey: ['memberSimpleInfo'],
        queryFn: getMemberSimpleInfo,
    });
    if (isLoading) {
        return (<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
            <div className="flex items-center mb-4">
                <Skeleton circle width={40} height={40} className="mr-3" />
                <Skeleton width={150} />
            </div>
            <Skeleton height={400} className="mb-4" />
            <div className="space-y-3">
                <Skeleton width={100} />
                <Skeleton count={2} />
            </div>
        </div>);
    }
    if (error) {
        return <div className="flex justify-center p-4">Error loading posts</div>;
    }
    return (
        <div className="max-w-[1000px] mx-auto px-4 py-8">
            {/* 프로필 섹션 */}
            <div className="flex items-center gap-8 mb-12">
                {/* 프로필 이미지 */}
                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src={userInfo?.profileImageUrl}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 사용자 정보 */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold dark:text-white">{userInfo?.memberName}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{userInfo?.studentId}</p>
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
            <MyPosts tabType={currentTab} />

        </div>
    );
}

const MyPosts = ({ tabType }: { tabType: TabType }) => {
    const api = tabType === 'posts' ? getMyPosts : getMyLikes;
    const { data: posts, isLoading, error } = useQuery<PostType[]>({
        queryKey: ['myPosts'],
        queryFn: api,
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading posts</div>;
    }
    return (
        <div className="grid grid-cols-3 gap-1 mt-4">
            {posts?.map((item) => (
                <Thumbnail key={item.boardId} post={item} />
            ))}
        </div>


    )
}