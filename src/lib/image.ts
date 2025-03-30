import { publicApi } from "./sendApi";

export const getImages = async (imageIds: number[]): Promise<any> => {
    const res = await publicApi.get('/image/list', {
        params: {
            imageIds: imageIds.join(',')
        }
    });
    return res.data.data
}
