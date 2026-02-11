import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import RouteError from "./components/RouteError";
import { Toaster } from "react-hot-toast";

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
          style: {
            fontSize: "0.5rem",
            fontFamily: "system-ui",
            fontWeight: "bold",
          },
        }}
      />
    </>
  );
}

export default App;
