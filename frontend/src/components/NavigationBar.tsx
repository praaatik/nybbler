"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {Button} from "./ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar.tsx";
import {LogOut, Monitor, Moon, Settings, Sun, User} from "lucide-react";
import {useTheme} from "../hooks/use-theme.tsx";

export interface User {
    name: string
    email: string
    avatar: string
}

interface NavigationBarProps {
    user: User;
    onOpenSettings: () => void;
    onLogout: () => void;
}

const NavigationBar = ({user, onOpenSettings, onLogout}: NavigationBarProps) => {
    const {theme, setTheme} = useTheme();

    return (
        <nav className="bg-background border-b border-border px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div>icon</div>
                        <span className="text-xl font-bold text-foreground">Nybbler</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2 px-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name}/>
                                    <AvatarFallback>
                    <span className="text-muted-foreground">
                      {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </span>
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="px-3 py-2 border-b">
                                <div className="font-medium text-foreground">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>

                            <DropdownMenuItem>
                                <User className="h-4 w-4 mr-2"/>
                                Profile
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={onOpenSettings}>
                                <Settings className="h-4 w-4 mr-2"/>
                                Settings
                            </DropdownMenuItem>

                            {/* Theme Switcher Submenu */}
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Monitor className="h-4 w-4 mr-2"/>
                                    Theme
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("light")}
                                                      className={theme === "light" ? "bg-accent" : ""}>
                                        <Sun className="h-4 w-4 mr-2"/>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}
                                                      className={theme === "dark" ? "bg-accent" : ""}>
                                        <Moon className="h-4 w-4 mr-2"/>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setTheme("system")}
                                        className={theme === "system" ? "bg-accent" : ""}
                                    >
                                        <Monitor className="h-4 w-4 mr-2"/>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>

                            <DropdownMenuSeparator/>

                            <DropdownMenuItem onClick={onLogout} className="text-destructive">
                                <LogOut className="h-4 w-4 mr-2"/>
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;