"use client";

import { Monitor, Moon, Sun, Palette } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx";
import { Button } from "../ui/button.tsx";
import { useTheme } from "../../hooks/use-theme.tsx";

const AuthenticationThemeToggle = () => {
    const { mode, theme, setMode, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Mode</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setMode("light")} className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Light
                    {mode === "light" && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMode("dark")} className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Dark
                    {mode === "dark" && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMode("system")} className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    System
                    {mode === "system" && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Theme</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme("default")} className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Default
                    {theme === "default" && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("bubblegum")} className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Bubblegum
                    {theme === "bubblegum" && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AuthenticationThemeToggle;
