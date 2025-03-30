import Post from '../../components/Post';
import Notice from '../../components/Notice';
import { getPosts } from '../../lib/post';
import { useQuery } from '@tanstack/react-query';
import { PostType } from '../../types/post';
import Skeleton from 'react-loading-skeleton';
export default function Main() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
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
        <div className="max-w-[935px] mx-auto py-4 px-10 pb-20 pt-10">
            <div className="flex gap-8 justify-center p-4">
                <div className="items-center w-full sm:w-[60%]">
                    {/* 포스트 영역 */}
                    <div className="space-y-4">
                        {posts.map((post: PostType) => (
                            <Post key={post.boardId} post={post} />
                        ))}
                    </div>
                </div>
                <div className="w-[40%] hidden sm:block">
                    <Notice />
                </div>
            </div>
        </div>
    );
}