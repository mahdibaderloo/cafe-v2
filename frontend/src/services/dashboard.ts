import type {LoginCredentials, LoginResponse} from "../types/dashboard.type.ts";

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`http://localhost:8080/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "خطا در ورود");
    }

    return response.json();
}