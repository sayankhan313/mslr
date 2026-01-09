import {z} from "zod"
const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signUpSchema=z.object({

    name:z
    .string()
    .min(2,"Name must be atleast 2 characters"),

    email:z
    .string()
    .regex(emailRegex,"Invalid email format"),
    dob: z
    .string()
    .min(1, "Date of birth is required"),

    password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters long"),

    scc: z
    .string()
    .min(10, "Invalid SCC code"),

})
export type SignUpInput = z.infer<typeof signUpSchema>;