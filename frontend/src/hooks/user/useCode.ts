import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userUseDiscountCode } from "../../services/dashboard";
import { toast } from "react-hot-toast";

export function useCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => userUseDiscountCode(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts", "discount"] });
      toast.success("کد تخفیف با موفقیت اعمال شد");
    },
    onError: () => {
      toast.error("کد تخفیف اشتباه است");
    },
  });
}
