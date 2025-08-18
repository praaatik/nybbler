"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card.tsx";
import {useState} from "react";
import AuthNavigation from "./auth-navigation.tsx";
import AuthToggle from "./auth-toggle.tsx";
import SigninForm from "./signin-form.tsx";
import type {SignInFormData} from "../../lib/validation.ts";

interface AuthState {
    mode: "signin" | "signup";
    isLoading: boolean;
    errors: Record<string, string>
}

const AuthPage = () => {
    const [authState, setAuthState] = useState<AuthState>({
        mode: "signin",
        errors: {},
        isLoading: false,
    });


    const handleModeToggle = (mode: "signin" | "signup") => {
        setAuthState((prev) => ({
            ...prev,
            mode,
            errors: {},
        }))
    }

    const handleSignIn = (data: SignInFormData) => {
        console.log(data);
    }


    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
            <AuthNavigation/>
            <div className="w-full max-w-md">
                <Card className="w-full shadow-bubblegum">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold">
                            {authState.mode === "signin" ? "Welcome back" : "Create account"}
                        </CardTitle>
                        <CardDescription>
                            {authState.mode === "signin"
                                ? "Sign in to your Nybbler account to continue"
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

                        {authState.mode === "signin" ? (
                            <SigninForm onSubmit={handleSignIn}/>
                        ) : (
                            <div>signup</div>
                        )}
                        <AuthToggle mode={authState.mode} onToggle={handleModeToggle}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AuthPage
