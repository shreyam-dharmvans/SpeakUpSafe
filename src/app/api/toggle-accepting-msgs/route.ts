import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "@/models/UserSchema";
import { dbConnect } from "@/lib/dbConnect";

export async function PUT(request: NextRequest) {

    try {
        await dbConnect();
        let session = await getServerSession(authOptions);
        let user = await User.findByIdAndUpdate(session?.user._id);

        if (!user) {
            return Response.json({
                success: false,
                message: "User does not exist."
            }, { status: 400 })
        }

        user.isAcceptingMsgs = !(user.isAcceptingMsgs);

        await user.save();


        return Response.json({
            success: true,
            message: "Accepting messages toggled successfully",
            isAcceptingMsgs: user.isAcceptingMsgs
        }, { status: 200 });

    } catch (error) {
        console.log("Error toggle accepting messages " + error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 });
    }

}