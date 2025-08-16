import {ThemeProvider} from "./components/theme-provider.tsx";
import SnippetsContainer from "./components/SnippetsContainer.tsx";
import ProtectedRoute from "./components/protected-route.tsx";

function App() {
    return (
        <ThemeProvider storageKey="ui-theme">
            <ProtectedRoute>
                <SnippetsContainer/>
            </ProtectedRoute>
        </ThemeProvider>
    )
}

export default App
