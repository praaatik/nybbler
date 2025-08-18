"use client"

import {Button} from "../ui/button"

interface AuthToggleProps {
    mode: "login" | "signup"
    onToggle: (mode: "login" | "signup") => void
}

const AuthToggle = ({mode, onToggle}: AuthToggleProps) => {
    return (
        <div className="text-center">
            <p className="text-sm text-muted-foreground">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
                variant="link"
                className="p-0 h-auto font-medium text-primary hover:text-primary/80 cursor-pointer"
                onClick={() => onToggle(mode === "login" ? "signup" : "login")}
            >
                {mode === "login" ? "Sign up" : "Sign in"}
            </Button>
        </div>
    )
}

export default AuthToggle;