import { User, UserSchema } from "@/models/UserSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt"
import { dbConnect } from "@/lib/dbConnect";
import { UserType } from "@/types/UserType";
import { NextAuthOptions } from "next-auth";
import { sendEmail } from "@/helpers/sendEmail";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                username: { label: "Username/Email", type: "text", placeholder: "anonymous101@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<any> {
                await dbConnect();

                try {
                    let username = credentials?.username;
                    let password = credentials?.password;

                    let user: UserType | null = await User.findOne({
                        // $or: [{ username }, { email: username }]
                        username
                    });


                    if (user) {
                        let result = await compare(password as string, user.password);

                        if (result) {


                            if (user.isVerified) {
                                return user;
                            } else {
                                let curr: Date = new Date()
                                if (user.verifyCodeExpiry < curr) {


                                    let verifyCode: number = Math.floor(Math.random() * 10000000) + 1;

                                    let verifyCodeExpiry: Date = new Date();
                                    verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 30);

                                    let res = await User.findByIdAndUpdate(user._id, { verifyCode, verifyCodeExpiry }, { new: true });

                                    if (res) {
                                        let emailResult = await sendEmail(res.email, res.username, res.verifyCode);

                                        if (!emailResult.success) {
                                            throw new Error("Error in sending New Verification code");
                                        }
                                    }


                                }


                                throw new Error("User is not verified.Please verify user");
                            }
                        }

                        throw new Error("Password is incorrect");
                    } else {
                        throw new Error("User is not found in database");
                    }
                } catch (error: any) {
                    throw new Error(error);
                }

            }
        })
        // ...add more providers here 

    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.email = user.email;
                //   token.isAcceptingMsgs = user.isAcceptingMsgs;
                token.username = user.username
                //    token.verifyCode = user.verifyCode
                //   token.verifyCodeExpiry = user.verifyCodeExpiry
            }

            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.email = token.email;
                //    session.user.isAcceptingMsgs = token.isAcceptingMsgs;
                session.user.username = token.username;
                //  session.user.verifyCode = token.verifyCode;
                //  session.user.verifyCodeExpiry = token.verifyCodeExpiry;
            }

            return session
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    }
}