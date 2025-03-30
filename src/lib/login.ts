import { loginParam } from "../types/login";
import { privateApi, publicApi } from "./sendApi";

export const loginAction = async (loginParam: loginParam): Promise<any> => {
    return publicApi.post('/login', loginParam, { withCredentials: true })
}
export const logoutAction = async (): Promise<any> => {
    return privateApi.post('/auth/logout', {}, { withCredentials: true })
}
export const setAccessToken = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken)
}
export const registerMemberAction = async (formData: FormData): Promise<any> => {
    return publicApi.post('/member', formData, { withCredentials: true })
}
export const adminCheck = (formData: loginParam) => {
    if (formData.studentId === '0' && formData.memberName === '박지혜') {
        localStorage.setItem('admin', 'true');
    }
}
