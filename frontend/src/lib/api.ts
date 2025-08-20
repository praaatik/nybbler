import axios from "axios";

// TODO: hard coding the baseURL for now
export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface User {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Session {
    id: string;
    userId: string;
    expiresAt: string;
    token: string;
}

export interface AuthResponse {
    user: User;
    session: Session;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
}

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post("/auth/sign-in", credentials);
        return response.data;
    },

    // TODO: check if this one is required, remove if not
    getMe: async (): Promise<{ user: User; session: Session }> => {
        const response = await api.get("/me");
        return response.data;
    },

    // TODO: check if this one is required as is
    checkAuth: async (): Promise<{ user: User | null; session: Session | null }> => {
        try {
            const response = await api.get("/me");
            console.log(response);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return { user: null, session: null };
        }
    },
};
