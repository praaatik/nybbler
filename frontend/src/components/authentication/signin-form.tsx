"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { type SignInFormData, signInSchema } from "../../lib/validation.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import { Eye, EyeOff } from "lucide-react";

interface SigninFormProps {
    onSubmit: (data: SignInFormData) => void;
    isLoading?: boolean;
}

const SigninForm = ({ onSubmit }: SigninFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, formState: { errors }, register } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onFormSubmit = async (data: SignInFormData) => {
        // console.log(data);
        onSubmit(data);
    };

    const isLoading = false;

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <Input
                    id="email"
                    type="text"
                    placeholder="Enter your email or username"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                    disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password")}
                        className={errors.password ? "border-destructive pr-10" : "pr-10"}
                        disabled={isLoading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                    >
                        {showPassword
                            ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                )
                            : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                        <span
                            className="sr-only"
                        >
                            {showPassword ? "Hide password" : "Show password"}
                        </span>
                    </Button>
                </div>
                {errors.password
                    && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
                <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-primary hover:text-primary/80 cursor-pointer"
                    type="button"
                    disabled={isLoading}
                >
                    Forgot password?
                </Button>
            </div>

            <Button
                type="submit"
                className="w-full shadow-bubblegum-sm cursor-pointer"
                disabled={isLoading}
            >
                {isLoading ? "Signing in..." : "Sign in"}
            </Button>
        </form>
    );
};
export default SigninForm;
