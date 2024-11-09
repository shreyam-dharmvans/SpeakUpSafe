export interface UserType {
    _id?: string
    username: string,
    email: string,
    password: string,
    isAcceptingMsgs: boolean,
    verifyCode: number,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    messages?: {
        _id?: string,
        createdAt: Date,
        message: string
    }[]
}