"use client";

import { ThemeProvider } from "./components/theme-provider.tsx";
import SnippetsContainer from "./components/SnippetsContainer.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider storageKey="ui-theme">
                <ProtectedRoute>
                    <SnippetsContainer />
                </ProtectedRoute>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
