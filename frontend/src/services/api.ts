import { toast } from "react-hot-toast";
import { useAdminStore } from "../store/adminStore";

const BASE_URL = "http://localhost:8080/api/";

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  { auth = false, ...options }: ApiOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

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
    useAdminStore.getState().logout();
    toast.error("ابتدا وارد حساب کاربری شوید.");
    window.location.replace("/login");
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const error = await response.json();
      throw new Error(error.message ?? "خطایی رخ داده است.");
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text() as T;
}
