import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "@/models/UserSchema";
import { UserType } from "@/types/UserType";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET(request: Request) {

    try {
        await dbConnect();
        let session = await getServerSession(authOptions);

        let id = new mongoose.Types.ObjectId(session?.user._id);


        let user: UserType[] = await User.aggregate([
            { $match: { _id: id } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: "$_id", messages: { $push: "$messages" } } }
        ]).exec();


        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }

        return Response.json({
            success: true,
            message: "Fetched messages successfully",
            messages: user[0].messages,
        }, { status: 200 })

    } catch (error) {
        console.log("Error getting messages : " + error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        })
    }

}