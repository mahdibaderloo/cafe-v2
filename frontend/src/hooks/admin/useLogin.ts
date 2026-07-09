import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Login {
  email: string;
  password: string;
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login-admin"],
    // mutationFn: login,
    onSuccess: (data) => {
      toast.success("با موفقیت وارد شدید");

      queryClient.setQueryData(["admin"], user);
    },
    onError: () => {
      toast.error("اطلاعات وارد شده صحیح نیست");
    },
  });
}
