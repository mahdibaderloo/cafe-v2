import dashboardIcon from "../assets/images/dashboard.svg";
import productsIcon from "../assets/images/products.svg";
import ordersIcon from "../assets/images/orders.svg";
import percentIcon from "../assets/images/percent.svg";

export const options = [
  { id: 1, title: "داشبورد", icon: dashboardIcon, path: "/dashboard" },
  { id: 2, title: "محصولات", icon: productsIcon, path: "/dashboard/products" },
  { id: 3, title: "سفارشات", icon: ordersIcon, path: "/dashboard/orders" },
  { id: 4, title: "تخفیفات", icon: percentIcon, path: "/dashboard/discounts" },
];

export function calcTotal(
  totalPrice: number,
  discountValue: number,
  discountType: string,
) {
  if (discountType === "PERCENTAGE") {
    return (totalPrice * discountValue) / 100;
  } else {
    return totalPrice - discountValue;
  }
}
