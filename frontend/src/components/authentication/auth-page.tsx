"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card.tsx";
import {useState} from "react";
import AuthNavigation from "./auth-navigation.tsx";
import {useForm} from "react-hook-form";
import {type LoginFormData, loginSchema} from "../../lib/validation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "../ui/label.tsx";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {Eye, EyeOff} from "lucide-react";

interface AuthState {
    mode: "login" | "signup";
    isLoading: boolean;
    errors: Record<string, string>
}

const AuthPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [authState, _setAuthState] = useState<AuthState>({
        mode: "login",
        errors: {},
        isLoading: false,
    });

    const {handleSubmit, formState: {errors}, register} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onFormSubmit = async (_data: LoginFormData) => {
    }

    const isLoading = false;

    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
            <AuthNavigation/>
            <div className="w-full max-w-md">
                <Card className="w-full shadow-bubblegum">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold">
                            {authState.mode === "login" ? "Welcome back" : "Create account"}
                        </CardTitle>
                        <CardDescription>
                            {authState.mode === "login"
                                ? "Sign in to your account to continue"
                                : "Sign up to get started with Nybbler"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {authState.errors.general && (
                            <div
                                className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                {authState.errors.general}
                            </div>
                        )}

                        {authState.mode === "login" ? (
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
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground"/>
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground"/>
                                            )}
                                            <span
                                                className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                        </Button>
                                    </div>
                                    {errors.password &&
                                        <p className="text-sm text-destructive">{errors.password.message}</p>}
                                </div>

                                <div className="flex items-center justify-between">
                                    <Button
                                        variant="link"
                                        className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                                        type="button"
                                        disabled={isLoading}
                                    >
                                        Forgot password?
                                    </Button>
                                </div>

                                <Button type="submit" className="w-full shadow-bubblegum-sm" disabled={isLoading}>
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </Button>
                            </form>
                        ) : (
                            <div>signup</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AuthPage
