import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {login} from "../../services/dashboard.ts";
import {useNavigate} from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login-admin"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("liilo-admin", JSON.stringify(data));
      queryClient.setQueryData(["admin"], data);
      toast.success("با موفقیت وارد شدید");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("اطلاعات وارد شده صحیح نیست");
    },
  });
}
