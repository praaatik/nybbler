import {z} from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required")
})

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must include an uppercase letter")
        .regex(/[a-z]/, "Password must include a lowercase letter")
        .regex(/\d/, "Password must include a number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include a special character"),
    confirmPassword: z.string().min(1, "Confirmation Password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;