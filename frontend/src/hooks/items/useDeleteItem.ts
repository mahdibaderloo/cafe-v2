import { useMutation } from "@tanstack/react-query";
import { deleteItem } from "../../services/item";
import { toast } from "react-hot-toast";
import useModalStore from "../../store/modal";

export function useDeleteItem() {
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      toast.success("محصول با موفقیت حذف شد");
      closeModal();
    },
    onError: (error: Error) => {
      toast.error("خطا در حذف محصول");
      console.error(error);
    },
  });
}
