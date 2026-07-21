import logo from "../../assets/images/dashboard-logo.png";
import logoutIcon from "../../assets/images/logout.svg";
import { options } from "../../utils/dashboard";
import DashboardNavItem from "./DashboardNavItem";

export default function DashboardNav() {
  return (
    <nav className="bg-[#748F80] h-screen w-70 xl:w-85 2xl:w-100">
      <img src={logo} alt="logo" className="mx-auto" />
      <ul className="flex flex-col h-[60%] p-2 gap-1">
        {options.map((option) => (
          <DashboardNavItem key={option.id} option={option} />
        ))}
        <li className="flex gap-1 2xl:gap-4 items-center p-2 xl:p-3 2xl:p-4 pr-4 mt-auto cursor-pointer hover:bg-[#785459] rounded-md transition-all duration-150">
          <div className="w-10 pr-1">
            <img src={logoutIcon} alt="icon" className="w-4 xl:w-5.5 2xl:w-7" />
          </div>
          <p className="text-white font-medium text-sm xl:text-[1rem] 2xl:text-lg">خروج</p>
        </li>
      </ul>
    </nav>
  );
}
