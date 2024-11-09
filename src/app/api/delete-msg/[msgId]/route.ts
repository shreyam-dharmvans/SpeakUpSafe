import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "@/models/UserSchema";
import { UserType } from "@/types/UserType";
import { dbConnect } from "@/lib/dbConnect";


export async function DELETE(request: Request, { params }: { params: { msgId: string } }) {

    try {
        await dbConnect()
        let msgId = params.msgId;
        let session = await getServerSession(authOptions);

        let id = session?.user._id;

        let user = await User.findByIdAndUpdate(id, { $pull: { messages: { _id: msgId } } }, { new: true });

        if (!user) {
            return Response.json({
                success: false,
                message: "User Not Found"
            })
        }

        return Response.json({
            success: true,
            message: "Message deleted successfully"
        }, { status: 200 })

    } catch (error) {
        console.log("Error deleting message : " + error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }


}