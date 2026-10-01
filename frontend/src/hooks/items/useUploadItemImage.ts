import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { uploadItemImage } from "../../services/item";

export function useUploadItemImage() {
  return useMutation({
    mutationFn: (file: File) => uploadItemImage(file),

    onSuccess: () => {
      toast.success("عکس با موفقیت آپلود شد");
    },

    onError: (error: Error) => {
      console.error(error);
      toast.error("خطا در آپلود عکس");
    },
  });
}
