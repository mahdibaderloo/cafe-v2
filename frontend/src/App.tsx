import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import RouteError from "./components/RouteError";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/dashboard/Products";
import Orders from "./pages/dashboard/Orders";
import Discounts from "./pages/dashboard/Discounts";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import ProductsItems from "./pages/dashboard/ProductsItems";
import ProductsCategories from "./pages/dashboard/ProductsCategories";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <MainMenu /> },
      { path: "/shopping-cart", element: <ShoppingCart /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/login", element: <Login /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <DashboardOverview /> },
          {
            path: "products",
            element: <Products />,
            children: [
              { index: true, element: <ProductsCategories /> },
              { path: ":categoryId", element: <ProductsItems /> },
            ],
          },
          { path: "orders", element: <Orders /> },
          { path: "discounts", element: <Discounts /> },
        ],
      },
      { path: "*", element: <RouteError /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "w-[90vw]! max-w-[600px]! sm:p-2! rounded-lg! sm:rounded-xl! font-bold font-systemUi",
        }}
      />
    </>
  );
}

export default App;
