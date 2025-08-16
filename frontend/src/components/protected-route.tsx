"use client"

import AuthPage from "./authentication/auth-page.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    //TODO: hard coding this for now
    const isLoggedIn = false;
    if (!isLoggedIn) {
        return <AuthPage/>
    }

    return <>{children} </>
}

export default ProtectedRoute