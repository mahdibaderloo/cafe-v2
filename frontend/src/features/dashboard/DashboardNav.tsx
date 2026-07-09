import logo from "../../assets/images/dashboard-logo.png";
import dashboardIcon from "../../assets/images/dashboard.svg";
import productsIcon from "../../assets/images/products.svg";
import ordersIcon from "../../assets/images/orders.svg";
import profileIcon from "../../assets/images/profile.svg";
import logoutIcon from "../../assets/images/logout.svg";
import { NavLink } from "react-router-dom";

const options = [
  { id: 1, title: "داشبورد", icon: dashboardIcon, path: "/dashboard" },
  { id: 2, title: "محصولات", icon: productsIcon, path: "/dashboard/products" },
  { id: 3, title: "سفارشات", icon: ordersIcon, path: "/dashboard/orders" },
  { id: 4, title: "پروفایل", icon: profileIcon, path: "/dashboard/profile" },
];

export default function DashboardNav() {
  return (
    <nav className="bg-[#748F80] h-screen w-70">
      <img src={logo} alt="logo" className="mx-auto" />
      <ul className="flex flex-col h-[60%] p-2 gap-1">
        {options.map((option) => (
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
