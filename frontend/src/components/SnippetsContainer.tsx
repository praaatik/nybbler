"use client"

import NavigationBar from "./NavigationBar.tsx";
import {useState} from "react";
import SettingsModal from "./settings/Settings.tsx";

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
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <div>
            <div className="min-h-screen min-w-screen bg-background text-foreground transition-colors duration-200">
                <NavigationBar user={user} onOpenSettings={() => {
                    setSettingsOpen(true)
                }} onLogout={() => {
                }}/>
            </div>
            <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
        </div>
    )
}

export default SnippetsContainer;