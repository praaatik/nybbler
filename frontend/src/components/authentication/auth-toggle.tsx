"use client";

import { Button } from "../ui/button";

interface AuthToggleProps {
    mode: "signin" | "signup";
    onToggle: (mode: "signin" | "signup") => void;
}

const AuthToggle = ({ mode, onToggle }: AuthToggleProps) => {
    return (
        <div className="text-center">
            <p className="text-sm text-muted-foreground">
                {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
                variant="link"
                className="p-0 h-auto font-medium text-primary hover:text-primary/80 cursor-pointer"
                onClick={() => onToggle(mode === "signin" ? "signup" : "signin")}
            >
                {mode === "signin" ? "Sign up" : "Sign in"}
            </Button>
        </div>
    );
};

export default AuthToggle;
