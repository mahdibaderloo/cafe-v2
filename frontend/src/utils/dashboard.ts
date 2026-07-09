import dashboardIcon from "../../assets/images/dashboard.svg";
import productsIcon from "../../assets/images/products.svg";
import ordersIcon from "../../assets/images/orders.svg";
import profileIcon from "../../assets/images/profile.svg";

export const options = [
  { id: 1, title: "داشبورد", icon: dashboardIcon, path: "/dashboard" },
  { id: 2, title: "محصولات", icon: productsIcon, path: "/dashboard/products" },
  { id: 3, title: "سفارشات", icon: ordersIcon, path: "/dashboard/orders" },
  { id: 4, title: "پروفایل", icon: profileIcon, path: "/dashboard/profile" },
];
