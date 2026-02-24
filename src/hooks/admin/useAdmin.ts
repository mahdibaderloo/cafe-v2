import { useQuery } from "@tanstack/react-query";
import supabase from "../../supabase/supabase";
import toast from "react-hot-toast";

export function useAdmin() {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });
}

async function getAdmin() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  const user = data.user;
  if (!user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    toast.error("خطا در دریافت اطلاعات ادمین");
    return null;
  }

  return profile;
}
