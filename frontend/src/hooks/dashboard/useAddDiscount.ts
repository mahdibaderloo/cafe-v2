import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DiscountRequest } from "../../types/dashboard.type";
import { addNewDiscount } from "../../services/dashboard";
import { toast } from "react-hot-toast";
import useModalStore from "../../store/modal";

export function useAddDiscount() {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: (data: DiscountRequest) => addNewDiscount(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
      closeModal();
      toast.success("کد تخفیف با موفقیت ایجاد شد");
    },
    onError: (error: Error) => {
      toast.error("خطا در ایجاد کد تخفیف");
      console.error("Error creating discount:", error);
    },
  });
}
