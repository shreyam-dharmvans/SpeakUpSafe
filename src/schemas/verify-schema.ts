import { z } from "zod";


export const verifySchema = z.object({
    pin: z.string().min(6).max(8)
})