import mongoose from "mongoose";

async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL as string);
}

let isConnected: boolean = false;


export const dbConnect = async (): Promise<void> => {

    if (isConnected) {
        console.log("db is already connected");
        return;
    }

    try {
        await main();
        console.log("db is connected");
        isConnected = true;
    }
    catch (err) {
        console.log(err);
        isConnected = false;

        process.exit(1);
    }

}
