import {createContext, useEffect, useState} from "react"

type Mode = "dark" | "light" | "system"
type Theme = "bubblegum" | "default"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultMode?: Mode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    mode: Mode
    theme: Theme
    setMode: (mode: Mode) => void
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    mode: "system",
    theme: "default",
    setMode: () => null,
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
const ThemeProvider = ({
                           children,
                           defaultMode = "system",
                           defaultTheme = "default",
                           storageKey = "vite-ui-theme",
                           ...props
                       }: ThemeProviderProps & { defaultMode?: Mode }) => {
    const [mode, setMode] = useState<Mode>(
        () => (localStorage.getItem(`${storageKey}-mode`) as Mode) || defaultMode
    )

    const [theme, setTheme] = useState<Theme>(() => localStorage.getItem(`${storageKey}-theme`) as Theme) || defaultTheme


    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")
        root.removeAttribute("data-theme")

        if (mode === "system") {
            const systemMode = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemMode)
            if (theme === "default") {
                root.setAttribute("data-theme", "default")
            } else {
                root.setAttribute("data-theme", theme)
            }
            return
        }

        root.classList.add(mode)
        root.setAttribute("data-theme", theme)
    }, [mode, theme])

    useEffect(() => {
        localStorage.setItem(`${storageKey}-mode`, mode)
        localStorage.setItem(`${storageKey}-theme`, theme)
    }, [mode, storageKey, theme])

    const contextValue = {
        mode: mode,
        theme: theme,
        setMode: (mode: Mode) => {
            localStorage.setItem(`${storageKey}-mode`, mode)
            setMode(mode)
        },
        setTheme: (theme: Theme) => {
            localStorage.setItem(`${storageKey}-theme`, theme);
            setTheme(theme);
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={contextValue}>
            {children}
        </ThemeProviderContext.Provider>
    )
}


export {ThemeProvider, ThemeProviderContext, type Mode};