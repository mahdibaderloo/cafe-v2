import { toast } from "react-hot-toast";
import { useAdminStore } from "../store/adminStore";

export async function api(url: string) {
  const token = useAdminStore.getState()?.admin?.token;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    useAdminStore.getState().logout();
    toast.error("برای دسترسی به پنل ابتدا وارد شوید");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response.json();
}
