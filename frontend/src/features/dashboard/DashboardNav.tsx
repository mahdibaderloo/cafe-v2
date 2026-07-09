import logo from "../../assets/images/dashboard-logo.png";
import logoutIcon from "../../assets/images/logout.svg";
import { options } from "../../utils/dashboard";
import DashboardNavItem from "./DashboardNavItem";

export default function DashboardNav() {
  return (
    <nav className="bg-[#748F80] h-screen w-70">
      <img src={logo} alt="logo" className="mx-auto" />
      <ul className="flex flex-col h-[60%] p-2 gap-1">
        {options.map((option) => (
          <DashboardNavItem key={option.id} option={option} />
        ))}
        <li className="flex gap-1 items-center p-2 pr-4 mt-auto cursor-pointer hover:bg-[#785459] rounded-md transition-all duration-150">
          <div className="w-10 pr-1">
            <img src={logoutIcon} alt="icon" className="w-4" />
          </div>
          <p className="text-white font-medium text-sm">خروج</p>
        </li>
      </ul>
    </nav>
  );
}
