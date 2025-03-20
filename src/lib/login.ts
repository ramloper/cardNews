import { loginParam } from "../types/login";
import { publicApi } from "./sendApi";

export const loginAction = async (loginParam: loginParam): Promise<any> => {
    return publicApi.post('/login', loginParam, { withCredentials: true })
}
export const setAccessToken = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken)
}
export const registerMemberAction = async (formData: FormData): Promise<any> => {
    return publicApi.post('/member', formData, { withCredentials: true })
}
