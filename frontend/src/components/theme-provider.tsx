import {createContext, useEffect, useState} from "react"

type Mode = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultMode?: Mode
    storageKey?: string
}

type ThemeProviderState = {
    mode: Mode
    setMode: (mode: Mode) => void
}

const initialState: ThemeProviderState = {
    mode: "system",
    setMode: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
const ThemeProvider = ({
                           children,
                           defaultMode = "system",
                           storageKey = "vite-ui-theme",
                           ...props
                       }: ThemeProviderProps & {defaultMode? : Mode} ) => {
    const [mode, setMode] = useState<Mode>(
        // () => (localStorage.getItem(storageKey) as Mode) || defaultMode
        () => (localStorage.getItem(`${storageKey}-mode`) as Mode) || defaultMode
    )

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
            return
        }

        root.classList.add(mode)
    }, [mode])

    useEffect(() => {
        localStorage.setItem(`${storageKey}-mode`, mode)
    }, [mode, storageKey])

    const contextValue = {
        mode: mode,
        setMode: (mode: Mode) => {
            localStorage.setItem(`${storageKey}-mode`, mode)
            setMode(mode)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={contextValue}>
            {children}
        </ThemeProviderContext.Provider>
    )
}


export {ThemeProvider, ThemeProviderContext, type Mode};