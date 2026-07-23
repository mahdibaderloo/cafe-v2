import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAdminStore } from "../../store/adminStore";

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAdminStore();
  const handleLogout = () => {
    logout();
    toast.success("با موفقیت خارج شدید");
    navigate("/login");
  };

  return { logout: handleLogout };
}
