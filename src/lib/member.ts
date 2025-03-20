import { privateApi } from "./sendApi"

export const getMemberSimpleInfo = async (): Promise<any> => {
    const res = await privateApi.get('/auth/member');
    return res.data.data
}