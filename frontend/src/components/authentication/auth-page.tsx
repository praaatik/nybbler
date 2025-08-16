"use client"

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

    return (<div>authentication page</div>)
}

export default AuthPage