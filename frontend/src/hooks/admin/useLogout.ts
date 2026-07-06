import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout-admin"],
    // mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("شما از پنل خارج شدید");
    },
    onError: () => {
      toast.error("خطایی پیش آمده . دوباره تلاش کنید");
    },
  });
}

// async function logout() {
//   const { error } = await auth.signOut();

//   if (error) {
//     throw new Error(error.message);
//   }
// }
