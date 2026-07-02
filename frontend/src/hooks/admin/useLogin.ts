import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../supabase/supabase";
import toast from "react-hot-toast";

interface Login {
  email: string;
  password: string;
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login-admin"],
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("با موفقیت وارد شدید");

      queryClient.setQueryData(["admin"], data.user);
    },
    onError: () => {
      toast.error("اطلاعات وارد شده صحیح نیست");
    },
  });
}

async function login({ email, password }: Login) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// async function getAdmin() {
//   const { data, error } = await supabase.auth.getUser();

//   if (error) {
//     return;
//   }

//   const user = data.user;
//   if (!user) {
//     return;
//   }
// }

// export async function isValidAdmin(email, password) {

//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("user_id", user.id)
//     .single();

//   if (profileError) {
//     console.error("❌ خطا در گرفتن کاربر:", profileError.message);
//   } else {
//     return profile;
//   }
// }

// export async function editAdminData(adminData) {
//   const { id, username, email, password, image } = adminData;
//   const { data, error } = await supabase
//     .from("profiles")
//     .update({ username, email, password, image })
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.error("Update error:", error);
//     throw new Error(error.message);
//   }

//   console.log("Update success:", data);
//   return data;
// }

// export async function logout() {
//   const { error } = await supabase.auth.signOut();

//   if (error) {
//     console.error("Logout error:", error);
//     throw new Error(error.message);
//   }
// }
