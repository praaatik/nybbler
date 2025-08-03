import {ThemeProvider} from "./components/theme-provider.tsx";
import SnippetsContainer from "./components/SnippetsContainer.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SnippetsContainer/>
        </ThemeProvider>
    )
}

export default App
