import { NavLink } from "react-router-dom";
import type { NavOption } from "../../types/dashboard.type";

export default function DashboardNavItem({ option }: { option: NavOption }) {
  return (
    <li key={option.id}>
      <NavLink
        to={option.path}
        className={({ isActive }) =>
          isActive
            ? "bg-[#5A3A3F] flex gap-1 items-center p-2 pr-4 rounded-md"
            : "hover:bg-[#785459] transition-all duration-150 flex gap-1 items-center p-2 pr-4 rounded-md"
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
