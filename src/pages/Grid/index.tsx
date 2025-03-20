import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import Thumbnail from "../../components/Thumbnail";
import { getPosts } from "../../lib/post";
import { PostType } from "../../types/post";
export default function Grid() {
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
        <div className="max-w-[1000px] mx-auto px-4">
            <h1 className="text-[26px] font-bold py-8 dark:text-white text-center">
                여기에 안내 멘트 들어감
            </h1>
            <div className="grid grid-cols-3 gap-1">
                {posts.map((post: PostType) => (
                    <Thumbnail key={post.boardId} post={post} />
                ))}
            </div>
        </div>
    );
}