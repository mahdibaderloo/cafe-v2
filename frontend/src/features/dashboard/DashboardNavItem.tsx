import { NavLink } from "react-router-dom";
import type { NavOption } from "../../types/dashboard.type";

export default function DashboardNavItem({ option }: { option: NavOption }) {
  return (
    <li key={option.id}>
      <NavLink
        to={option.path}
        end={option.path === "/dashboard"}
        className={({ isActive }) =>
          `flex gap-1 items-center p-2 pr-4 rounded-md transition-all duration-150 ${
            isActive
              ? "bg-[#5A3A3F] text-white"
              : "hover:bg-[#785459] text-white/80 hover:text-white"
          }`
        }
      >
        <div className="w-10 pr-1">
          <img
            src={option.icon}
            alt="icon"
            className={`${option.id === 3 || option.id === 4 ? "w-3.5" : "w-4"}`}
          />
        </div>
        <p className="text-white font-medium text-sm">{option.title}</p>
      </NavLink>
    </li>
  );
}
