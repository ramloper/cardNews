import { privateApi } from "./sendApi";

export const getImages = async (imageIds: number[]): Promise<any> => {
    const res = await privateApi.get('/auth/image/list', {
        params: {
            imageIds: imageIds.join(',')
        }
    });
    return res.data.data
}
