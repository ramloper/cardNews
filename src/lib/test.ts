import { sendPublicRequestWithToast } from "./sendApi";

export const getApi = async () => {
    const response = await sendPublicRequestWithToast({
        url: '/center/list/idName',
        method: 'GET'
    })
    return response.data
}
