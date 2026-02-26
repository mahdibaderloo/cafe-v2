import logo from "../../assets/images/dashboard-logo.png";
import dashboardIcon from "../../assets/images/dashboard.svg";
import productsIcon from "../../assets/images/products.svg";
import ordersIcon from "../../assets/images/orders.svg";
import profileIcon from "../../assets/images/profile.svg";
import { Link } from "react-router-dom";

const options = [
  { id: 1, title: "داشبورد", icon: dashboardIcon, path: "/dashboard" },
  { id: 2, title: "محصولات", icon: productsIcon, path: "/dashboard/products" },
  { id: 3, title: "سفارشات", icon: ordersIcon, path: "/dashboard/orders" },
  { id: 4, title: "پروفایل", icon: profileIcon, path: "/dashboard/profile" },
];

export default function DashboardNav() {
  return (
    <nav>
      <img src={logo} alt="logo" />
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            <Link to={option.path}>
              <img src={option.icon} alt="icon" />
              <p>{option.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
