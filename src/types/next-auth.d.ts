import 'next-auth'
import { DefaultSession } from 'next-auth'


declare module 'next-auth' {
    interface Session {
        user: {
            _id?: string;
            username?: string;
            email?: string;
            isAcceptingMsgs?: boolean;
            verifyCode?: number;
            verifyCodeExpiry?: Date;
        } & DefaultSession['user'];
    }

    interface User {
        _id?: string;
        username?: string;
        email?: string;
        password?: string;
        isAcceptingMsgs?: boolean;
        verifyCode?: number;
        verifyCodeExpiry?: Date;
    }

}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        username?: string;
        email?: string;
        password?: string;
        isAcceptingMsgs?: boolean;
        verifyCode?: number;
        verifyCodeExpiry?: Date;
    }
}
