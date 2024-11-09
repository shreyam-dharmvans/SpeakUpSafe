import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/UserSchema";
import { checkUsernameSchema } from "@/schemas/check-username-unique"



export async function GET(request: Request) {

    try {
        await dbConnect();

        let { searchParams } = new URL(request.url);

        let username = searchParams.get('username');

        let result = checkUsernameSchema.safeParse({ username });

        if (!result.success) {
            //console.log(result.error)
            return Response.json({
                success: false,
                message: result.error.issues[0].message.replace("String", "Username")
            }, { status: 400 })
        }

        let res = await User.findOne({ username });

        if (res) {
            return Response.json({
                success: false,
                message: "username already exists"
            }, { status: 400 })
        } else {
            return Response.json({
                success: true,
                message: "username is unique"
            }, { status: 200 });
        }
    } catch (error) {
        console.log("Error checking username : " + error)
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }


}