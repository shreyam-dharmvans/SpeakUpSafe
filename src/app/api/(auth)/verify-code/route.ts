//import { getServerSession } from "next-auth";
import { sendEmail } from "@/helpers/sendEmail";
import { User } from "@/models/UserSchema";
import { dbConnect } from "@/lib/dbConnect";


export async function POST(request: Request) {
    try {
        await dbConnect();
        let { verifyCode, username }: { verifyCode: Number, username: String } = await request.json();

        let user = await User.findOne({ username });


        if (!user) {
            return Response.json({
                success: false,
                message: "user was not found"
            }, { status: 400 })
        }


        let currDate: Date = new Date();
        if (user.verifyCodeExpiry < currDate) {
            let newVerifyCode = Math.floor((Math.random() * 10000000)) + 1;
            let verifyCodeExpiry = new Date();
            verifyCodeExpiry.setMinutes(currDate.getMinutes() + 30);

            let updatedUser = await User.findByIdAndUpdate(user._id, { verifyCode: newVerifyCode, verifyCodeExpiry }, { new: true });

            if (!updatedUser) {
                return Response.json({
                    success: false,
                    message: "Unable to set new verification code for user. Please try again later."
                });
            }

            let res = await sendEmail(updatedUser.email, updatedUser.username, updatedUser.verifyCode);

            if (res.success) {
                return Response.json({
                    success: false,
                    message: "Verification code have expired. Please enter new verification code"
                },
                    { status: 400 })

            } else {
                return Response.json({
                    success: false,
                    message: "Verification code have expired. Some error occurred in sending new verification code"
                }, { status: 400 })
            }
        }


        let id = user._id;
        if (user.verifyCode == verifyCode) {
            let res = await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });

            if (res) {
                return Response.json({
                    success: true,
                    message: "User is verified successfully"
                }, { status: 200 })
            }
        } else {
            return Response.json({
                success: false,
                message: "Verification code is wrong"
            }, { status: 400 })
        }

    } catch (error) {
        console.log("Error verifying code : " + error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }

}