"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card.tsx";
import {useState} from "react";

interface AuthState {
    mode: "login" | "signup";
    isLoading: boolean;
    errors: Record<string, string>
}

const AuthPage = () => {
    const [authState, _setAuthState] = useState<AuthState>({
        mode: "login",
        errors: {},
        isLoading: false,
    });

    return (<div className="min-h-screen bg-background">
        <main className="pt-16 min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-bubblegum">
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
                        <div>login</div>
                    ) : (
                        <div>signup</div>
                    )}
                </CardContent>
            </Card>
        </main>
    </div>)
}

export default AuthPage