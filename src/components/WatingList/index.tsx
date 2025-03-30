import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getWaitingList, approveWaiting } from "../../lib/member"
import { UserPlusIcon } from "@heroicons/react/24/outline"
import { myToast } from "../../lib/alert";

interface WaitingMember {
    memberId: number;
    memberName: string;
    studentId: string;
}

const WaitingList = () => {
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryKey: ['waitingList'],
        queryFn: getWaitingList,
    })

    const handleApprove = (memberId: number) => {
        approveWaiting(memberId).then(() => {
            queryClient.invalidateQueries({ queryKey: ['waitingList'] })
            myToast("승인 성공", 'success')
        }).catch((error) => {
            myToast(error.response.data.data.value, 'error');
        })
    };

    if (isLoading) return <div className="flex justify-center p-4">Loading...</div>
    if (error) return <div className="flex justify-center p-4">Error loading waiting list</div>

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4 dark:text-white">승인 대기 목록</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {data?.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        대기 중인 회원이 없습니다.
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data?.map((member: WaitingMember) => (
                            <li
                                key={member.memberId}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium dark:text-white">
                                            {member.memberName}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            학번: {member.studentId}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleApprove(member.memberId)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    <UserPlusIcon className="w-5 h-5" />
                                    <span>승인</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default WaitingList