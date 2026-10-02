import { toast } from "react-hot-toast";
import { useAdminStore } from "../store/adminStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

let isLoggingOut = false;

function logoutUser() {
  if (isLoggingOut) return;

  isLoggingOut = true;

  useAdminStore.getState().logout();

  toast.error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید.");

  window.location.replace("/login");
}

export async function apiClient<T>(
  endpoint: string,
  { auth = false, ...options }: ApiOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = useAdminStore.getState().admin?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logoutUser();
    throw new Error("Unauthorized");
  }

  if (response.status === 403) {
    throw new Error("شما اجازه انجام این عملیات را ندارید.");
  }

  if (!response.ok) {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const error = await response.json();

      if (error.validationErrors) {
        const firstError = Object.values(error.validationErrors)[0];
        if (typeof firstError === "string") {
          throw new Error(firstError);
        }
      }

      throw new Error(error.message ?? "خطایی رخ داده است.");
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return (await response.text()) as T;
}
