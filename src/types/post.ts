export interface PostType {
    boardId: number;
    title: string;
    content: string;
    memberName: string;
    profileImageUrl: string;
    likeCount: number;
    commentCount: number;
    isLike: boolean;
    imageIds: number[];
}

export interface PostDetailType {
    boardId: number;
    title: string;
    content: string;
    boardCreateName: string;
    boardCreateProfileImageUrl: string;
    likeCount: number;
    isLike: boolean;
    comments: CommentType[];
    images: string[]
}
interface CommentType {
    commentId: number;
    commentCreateName: string;
    commentCreateProfileImageUrl: string;
    content: string;
    commentCreateTime: string;
}