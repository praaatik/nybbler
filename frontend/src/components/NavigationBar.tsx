"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";
import { LogOut, Settings, User } from "lucide-react";

export interface User {
    name: string;
    email: string;
    avatar: string;
}

interface NavigationBarProps {
    user: User;
    onOpenSettings: () => void;
    onLogout: () => void;
}

const NavigationBar = ({ user, onOpenSettings, onLogout }: NavigationBarProps) => {
    return (
        <nav className="bg-background border-b border-border md:px-20 lg:px-40 px-7 py-3">
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
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                    <AvatarFallback>
                                        <span className="text-muted-foreground">
                                            {user.name
                                                .split(" ")
                                                .map(n => n[0])
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
                                <User className="h-4 w-4 mr-2" />
                                Profile
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={onOpenSettings}>
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={onLogout} className="text-destructive">
                                <LogOut className="h-4 w-4 mr-2" />
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
