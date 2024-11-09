import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/UserSchema";
import { MessageType } from "@/types/MessageType";
import { Suspense } from "react";

export async function POST(request: Request, { params }: {
    params: {
        username: string
    }
}) {

    try {
        await dbConnect();
        let username = params.username;

        let { message }: { message: string } = await request.json();

        let user = await User.findOne({ username });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 400 })
        }

        if (user.isAcceptingMsgs == false) {
            return Response.json({
                success: false,
                message: "User is not accepting messages"
            }, { status: 400 })
        }

        let createdAt = new Date();
        user.messages.push({ message, createdAt } as MessageType);

        await user.save();

        return Response.json({
            success: true,
            message: "Message sent successfully"
        }, { status: 200 })
    } catch (error) {
        console.log("Errro sending message : " + error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }
}