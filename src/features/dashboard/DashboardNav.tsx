import logo from "../../assets/images/dashboard-logo.png";
import dashboardIcon from "../../assets/images/dashboard.svg";
import productsIcon from "../../assets/images/products.svg";
import ordersIcon from "../../assets/images/orders.svg";
import profileIcon from "../../assets/images/profile.svg";
import logoutIcon from "../../assets/images/logout.svg";
import { Link } from "react-router-dom";

const options = [
  { id: 1, title: "داشبورد", icon: dashboardIcon, path: "/dashboard" },
  { id: 2, title: "محصولات", icon: productsIcon, path: "/dashboard/products" },
  { id: 3, title: "سفارشات", icon: ordersIcon, path: "/dashboard/orders" },
  { id: 4, title: "پروفایل", icon: profileIcon, path: "/dashboard/profile" },
];

export default function DashboardNav() {
  return (
    <nav className="bg-white h-screen w-50">
      <img src={logo} alt="logo" className="mx-auto" />
      <ul className="flex flex-col h-[70%]">
        {options.map((option) => (
          <li key={option.id}>
            <Link to={option.path} className="flex gap-1 items-center p-3 pr-4">
              <div className="w-10 pr-1">
                <img src={option.icon} alt="icon" className="w-4" />
              </div>
              <p className="text-gray-500 font-medium text-sm">
                {option.title}
              </p>
            </Link>
          </li>
        ))}
        <li className="flex gap-1 items-center p-3 pr-4 mt-auto cursor-pointer">
          <div className="w-10 pr-1">
            <img src={logoutIcon} alt="icon" className="w-4" />
          </div>
          <p className="text-gray-500 font-medium text-sm">خروج</p>
        </li>
      </ul>
    </nav>
  );
}
