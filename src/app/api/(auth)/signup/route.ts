import { sendEmail } from "@/helpers/sendEmail";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/UserSchema";
import { apiResponse } from "@/types/apiResponse";
import { UserType } from "@/types/UserType";
import { hash } from "bcrypt";


export async function POST(request: Request) {
    try {
        await dbConnect();
        let { username, email, password } = await request.json();

        let user = await User.findOne({ username });

        if (user) {
            return Response.json({
                success: false,
                message: "Username already exists"
            },
                { status: 400 }
            );
        }

        let hashedPassword = await hash(password, 10);

        let verifyCode: number = Math.floor(Math.random() * 10000000) + 1;

        let verifyCodeExpiry: Date = new Date();
        verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 30);

        let temp: UserType = {
            username,
            email,
            password: hashedPassword,
            isAcceptingMsgs: true,
            verifyCode,
            verifyCodeExpiry,
            isVerified: false
        }

        let newUser = new User(temp);
        await newUser.save();


        let result = await sendEmail(email, username, verifyCode);
        if (result.success) {
            return Response.json({
                success: true,
                message: "User registered successfully. Please verify your account",
            }, { status: 200 });
        } else {
            return Response.json({
                success: false,
                message: "Error occurred while sending verification email"
            }, { status: 400 })
        }
    } catch (error) {
        console.log("Error signing up : " + error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }

}