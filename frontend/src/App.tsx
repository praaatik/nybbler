import {ThemeProvider} from "./components/theme-provider.tsx";
import SnippetsContainer from "./components/SnippetsContainer.tsx";

function App() {
    return (
        <ThemeProvider storageKey="ui-theme">
            <SnippetsContainer/>
        </ThemeProvider>
    )
}

export default App
