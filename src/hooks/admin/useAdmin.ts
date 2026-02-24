import { useQuery } from "@tanstack/react-query";
import supabase from "../../supabase/supabase";

export function useLogin() {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });
}

async function getAdmin() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  const user = data.user;
  return user ?? null;
}
