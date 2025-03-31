import Skeleton from "react-loading-skeleton"
import { getNotices } from "../../lib/notice"
import { useQuery } from "@tanstack/react-query"
import { NoticeType } from "../../types/notice"

const Notice = () => {
    const {
        data: notices,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["notices"],
        queryFn: getNotices,
    })
    if (isLoading) {
        return (
            <div className='max-w-[935px] mx-auto py-4 px-2'>
                <div className='w-full xl:w-[600px] h-full'>
                    <Skeleton circle width={40} height={40} className='mr-3' />
                </div>
            </div>
        )
    }

    if (error) {
        return <div className='flex justify-center p-4'>Error loading posts</div>
    }
    return (
        <aside className='w-[30%]'>
            <div className='fixed'>
                <h2 className='text-lg font-bold mb-4 dark:text-white'>공지사항</h2>
                <div className='space-y-4 flex flex-col gap-4 justify-center'>
                    {notices?.length === 0 && (
                        <div className='flex justify-center p-4'>
                            <p className='text-gray-500 dark:text-gray-400'>공지사항이 없습니다.</p>
                        </div>
                    )}
                    {notices?.map((notice: NoticeType) => (
                        <NoticeItem key={notice.noticeId} notice={notice} />
                    ))}
                </div>
            </div>
        </aside>
    )
}

const NoticeItem = ({ notice }: { notice: NoticeType }) => {
    return (
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4'>
            <h3 className='font-semibold mb-2 dark:text-white'>{notice.title}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>{notice.content}</p>
        </div>
    )
}

export default Notice
