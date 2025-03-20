import { PostDetailType } from "../types/post";
import { privateApi } from "./sendApi"

export const registerPostAction = async (formData: FormData): Promise<any> => {
    return privateApi.post('/auth/board', formData)
}
export const getPosts = async (): Promise<any> => {
    const res = await privateApi.get('/auth/board/list');
    return res.data.data
}
export const getMyPosts = async (): Promise<any> => {
    const res = await privateApi.get('/auth/board/my/list');
    return res.data.data
}
export const getMyLikes = async (): Promise<any> => {
    const res = await privateApi.get('/auth/board/my/like');
    return res.data.data
}
export const getPostDetail = async (boardId: number): Promise<PostDetailType> => {
    const res = await privateApi.get(`/auth/board/${boardId}`);
    return res.data.data
}

export const postLike = async (boardId: number): Promise<any> => {
    const res = await privateApi.post(`/auth/board/like/${boardId}`);
    return res.data.data
}
export const deleteLike = async (boardId: number): Promise<any> => {
    const res = await privateApi.delete(`/auth/board/like/${boardId}`);
    return res.data.data
}

export const postComment = async (boardId: number, content: string): Promise<any> => {
    const res = await privateApi.post(`/auth/comment`, { boardId, content });
    return res.data.data
}

