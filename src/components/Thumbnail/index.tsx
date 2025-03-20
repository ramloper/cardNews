import { Square2StackIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { PostType } from '../../types/post';
import Detail from '../Detail';
import Skeleton from 'react-loading-skeleton';
import { getImages } from '../../lib/image';
import { useQuery } from '@tanstack/react-query';

const Thumbnail = ({ post }: { post: PostType }) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const { data: images, isLoading, error } = useQuery({
        queryKey: ['images', post.imageIds[0]],
        queryFn: () => getImages([post.imageIds[0]]),
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
        <>
            <div
                className="relative aspect-square cursor-pointer"
                onClick={() => setIsDetailOpen(true)}
            >
                <img
                    src={images[0].imageUrl}
                    alt="post-1"
                    className="w-full h-full object-cover flex-shrink-0"
                    draggable={false}
                />
                {post.imageIds.length > 1 && (
                    <div className="absolute top-2 right-2">
                        <Square2StackIcon className="w-5 h-5 text-white" />
                    </div>
                )}
            </div>

            {/* 디테일 모달 */}
            {isDetailOpen && (
                <Detail
                    id={post.boardId}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}
        </>
    );
};

export default Thumbnail;