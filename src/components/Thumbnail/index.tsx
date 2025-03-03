import { useState } from 'react';
import { Square2StackIcon } from '@heroicons/react/24/solid';
import { ThumbnailType } from '../../types/thumbnail';
import Detail from '../Detail';

const Thumbnail = ({ imgObject }: { imgObject: ThumbnailType }) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    return (
        <>
            <div
                className="relative aspect-square cursor-pointer"
                onClick={() => setIsDetailOpen(true)}
            >
                <img
                    src={imgObject.img}
                    alt="post-1"
                    className="w-full h-full object-cover flex-shrink-0"
                    draggable={false}
                />
                {imgObject.imgCount > 1 && (
                    <div className="absolute top-2 right-2">
                        <Square2StackIcon className="w-5 h-5 text-white" />
                    </div>
                )}
            </div>

            {/* 디테일 모달 */}
            {isDetailOpen && (
                <Detail
                    id={imgObject.id}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}
        </>
    );
};

export default Thumbnail;