import { z } from "zod";

export const checkUsernameSchema = z.object({
    username: z.string().min(1).max(30)
})
