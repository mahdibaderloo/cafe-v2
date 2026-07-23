import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../../services/dashboard.ts";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore.ts";

export function useLogin() {
  const navigate = useNavigate();
  const { setAdmin } = useAdminStore();

  return useMutation({
    mutationKey: ["login-admin"],
    mutationFn: login,
    onSuccess: (data) => {
      setAdmin(data);
      toast.success("با موفقیت وارد شدید");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("اطلاعات وارد شده صحیح نیست");
    },
  });
}
