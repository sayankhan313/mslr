import {z} from "zod";
const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signInSchema=z.object({
    email:z
    .string()
    .regex(emailRegex,"Invalid email format"),
    password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters long"),

});
export type SignInInput = z.infer<typeof signInSchema>;