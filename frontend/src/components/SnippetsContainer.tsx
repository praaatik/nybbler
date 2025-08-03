"use client"

import NavigationBar from "./NavigationBar.tsx";

export interface User {
    name: string
    email: string
    avatar: string
}

const SnippetsContainer = () => {
    //TODO: Remove mock data and replace with actual user data from context or props or backend
    const user: User = {
        name: "Django The Cat",
        email: "django@catmail.com",
        avatar: "",
    }

    return (
        <div>
            <div className="min-h-screen min-w-screen bg-background text-foreground transition-colors duration-200">
                <NavigationBar user={user} onOpenSettings={() => {
                }} onLogout={() => {
                }}/>
            </div>
        </div>
    )
}

export default SnippetsContainer;