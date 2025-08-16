import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required")
})

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirmation Password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;