import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <MainMenu /> },
      { path: "/shopping-cart", element: <ShoppingCart /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
