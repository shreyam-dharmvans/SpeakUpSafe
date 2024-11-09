import { z } from "zod";

export const signinSchema = z.object({
    username: z.string().min(2).max(30),
    password: z.string().min(2).max(12),
})