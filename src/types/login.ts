export interface loginParam {
    studentId: string,
    memberName: string,
    password: string
}
export interface registerMemberParam {
    studentId: string,
    memberName: string,
    password: string,
    profileImage: File | null
}

