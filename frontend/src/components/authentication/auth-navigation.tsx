"use client";

import AuthenticationThemeToggle from "./auth-theme-toggler.tsx";

const AuthNavigation = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
            <div className="md:px-20 lg:px-40 px-7 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* TODO: check icon here as well */}
                        <span className="text-xl font-bold text-foreground">Nybbler</span>
                    </div>
                    <AuthenticationThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default AuthNavigation;
