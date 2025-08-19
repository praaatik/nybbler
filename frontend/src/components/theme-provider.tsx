import { createContext, useEffect, useState } from "react";

type Mode = "dark" | "light" | "system";
type Theme = "bubblegum" | "default";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultMode?: Mode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    mode: Mode;
    theme: Theme;
    setMode: (mode: Mode) => void;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    mode: "system",
    theme: "default",
    setMode: () => null,
    setTheme: () => null,
};

// making this generic instead of string because of Mode and Theme
// check if I can do T extends string instead?
// const safeGetValueLocalStorage = <T, >(key: string, fallback: T): T => {
//     if (typeof window === "undefined") return fallback;
//     try {
//         const value = localStorage.getItem(key);
//         return (value as T) || fallback;
//     } catch {
//         return fallback;
//     }
// };

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
const ThemeProvider = ({
    children,
    defaultMode = "system",
    defaultTheme = "default",
    storageKey = "ui-theme",
}: ThemeProviderProps & { defaultMode?: Mode; defaultTheme?: Theme }) => {
    // console.log(defaultTheme, defaultMode)
    const [mode, setMode] = useState<Mode>(() => {
        if (typeof window === "undefined") {
            return defaultMode;
        }
        try {
            const storedMode = localStorage.getItem(`${storageKey}:mode`) as Mode | null;
            if (storedMode) {
                return storedMode;
            }
            return defaultMode;
        }
        catch {
            return defaultMode;
        }
    });

    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") {
            return defaultTheme;
        }
        try {
            const storedTheme = localStorage.getItem(`${storageKey}:theme`) as Theme | null;
            if (storedTheme) {
                return storedTheme;
            }
            return defaultTheme;
        }
        catch {
            return defaultTheme;
        }
    });

    useEffect(() => {
        const root = document.documentElement;
        const finalMode = mode === "system"
            ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            : mode;

        root.classList.remove("light", "dark");
        root.classList.add(finalMode);
        root.setAttribute("data-theme", theme);
    }, [mode, theme]);

    useEffect(() => {
        localStorage.setItem(`${storageKey}:mode`, mode);
        localStorage.setItem(`${storageKey}:theme`, theme);
    }, [mode, storageKey, theme]);

    const contextValue = {
        mode: mode,
        theme: theme,
        setMode: setMode,
        setTheme: setTheme,
    };

    return (
        <ThemeProviderContext.Provider value={contextValue}>
            {children}
        </ThemeProviderContext.Provider>
    );
};

export { ThemeProvider, ThemeProviderContext, type Mode };
