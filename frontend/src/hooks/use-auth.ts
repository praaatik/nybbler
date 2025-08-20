import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../lib/api";

export const useAuth = () => {
    const queryClient = useQueryClient();

    const {
        data: authData,
        isLoading: isAuthLoading,
        error: authError,
    } = useQuery({
        queryKey: ["auth"],
        queryFn: authApi.checkAuth,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const user = authData?.user || null;
    const session = authData?.session || null;
    const isAuthenticated = !!user && !!session;

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            queryClient.setQueryData(["auth"], data);
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    return {
        user,
        session,
        isAuthenticated,
        isAuthLoading,
        authError,
        login: loginMutation.mutate,
        isLoginLoading: loginMutation.isPending,
        loginError: loginMutation.error,
    };
};
