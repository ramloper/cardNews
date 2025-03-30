import { privateApi } from "./sendApi"
import { NoticeType } from "../types/notice"

export const registerNoticeAction = async (notice: NoticeType): Promise<any> => {
    return privateApi.post('/auth/notice', notice)
}

export const getNotices = async (): Promise<NoticeType[]> => {
    const res = await privateApi.get('/auth/notice/list');
    return res.data.data
}