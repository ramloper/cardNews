import { privateApi } from "./sendApi"

export const getMemberSimpleInfo = async (): Promise<any> => {
    const res = await privateApi.get('/auth/member');
    return res.data.data
}

export const getWaitingList = async (): Promise<any> => {
    const res = await privateApi.get('/admin/waiting/join');
    return res.data.data
}

export const approveWaiting = async (memberId: number): Promise<any> => {
    const res = await privateApi.patch(`/admin/waiting/join/${memberId}`);
    return res.data.data
}