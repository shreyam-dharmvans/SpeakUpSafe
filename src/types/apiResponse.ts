import { MessageType } from "./MessageType";

export interface apiResponse {
    success: boolean,
    message: string,
    messages?: MessageType[],
    isAcceptingMsgs?: boolean,
    verifyCode?: number
}