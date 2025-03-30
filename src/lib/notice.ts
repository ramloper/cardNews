import { privateApi, publicApi } from "./sendApi"
import { NoticeType } from "../types/notice"

export const registerNoticeAction = async (notice: NoticeType): Promise<any> => {
    return privateApi.post('/admin/notice', notice)
}

export const getNotices = async (): Promise<NoticeType[]> => {
    const res = await publicApi.get('/notice/list');
    return res.data.data
}

export const getTitle = async (): Promise<any> => {
    const res = await privateApi.get('/auth/title');
    return res.data.data
}

export const patchTitle = async (title: string): Promise<any> => {
    const res = await privateApi.patch(`/admin/title?title=${title}`);
    return res.data.data
}