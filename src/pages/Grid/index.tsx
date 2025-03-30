import { useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import Thumbnail from "../../components/Thumbnail";
import { getPosts } from "../../lib/post";
import { PostType } from "../../types/post";
import { getTitle, patchTitle } from "../../lib/notice";
import { useState, useEffect } from "react";
import { myToast } from "../../lib/alert";
export default function Grid() {
    const queryClient = useQueryClient();


    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });
    const { data: title, isLoading: titleLoading, error: titleError } = useQuery({
        queryKey: ['title'],
        queryFn: getTitle,
    })
    const [patchTitleStatus, setPatchTitleStatus] = useState(false);
    const [titleValue, setTitleValue] = useState<string>(title?.title || "");
    const onClickPatchTitleValue = () => {
        if (patchTitleStatus) {
            patchTitle(titleValue).then(() => {
                myToast('제목 수정 성공', 'success');
                setPatchTitleStatus(false);
                queryClient.invalidateQueries({ queryKey: ['title'] });
            }).catch((error) => {
                myToast(error.response.data.data.value, 'error');
            })
        } else {
            setPatchTitleStatus(true)
        }
    }
    if (isLoading || titleLoading) {
        return (<div className="max-w-[935px] mx-auto py-4 px-2">
            <div className="w-full xl:w-[600px] h-full">
                <Skeleton circle width={40} height={40} className="mr-3" />
            </div>
        </div>);
    }
    if (error || titleError) {
        return <div className="flex justify-center p-4">Error loading posts</div>;
    }
    return (
        <div className="max-w-[1000px] mx-auto px-4">
            <div className="flex flex-row items-center justify-center gap-16">
                {patchTitleStatus ? (
                    <input type="text" placeholder="제목을 입력해주세요" className="w-[200px] h-[40px] rounded-md border-2 border-gray-300 p-2" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                ) : (
                    <h1 className="text-[26px] font-bold py-8 dark:text-white text-center">
                        {title?.title}
                    </h1>
                )}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={onClickPatchTitleValue}>
                    제목 수정
                </button>
            </div>
            <div className="grid grid-cols-3 gap-1">
                {posts.map((post: PostType) => (
                    <Thumbnail key={post.boardId} post={post} />
                ))}
            </div>
        </div>
    );
}