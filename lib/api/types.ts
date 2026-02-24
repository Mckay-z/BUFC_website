export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "fan";
    isActive: boolean;
    avatar?: string;
    headerImage?: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}
