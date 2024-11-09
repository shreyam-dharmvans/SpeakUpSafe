import mongoose, { Document, Schema, model } from "mongoose";

export interface UserSchema extends Document {
    username: string,
    email: string,
    password: string,
    isAcceptingMsgs: boolean,
    verifyCode: number,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    messages: {
        createdAt: Date,
        message: string
    }[]
}


const UserSchema = new Schema<UserSchema>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: true
    },
    isAcceptingMsgs: {
        type: Boolean,
        required: true,
        default: true
    },
    verifyCode: {
        type: Number,
        required: true
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    messages: [{
        createdAt: { type: Date, default: Date.now() },
        message: { type: String, required: true }
    }]
})

export const User = (mongoose.models.User as mongoose.Model<UserSchema>) || model<UserSchema>("User", UserSchema);