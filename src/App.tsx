import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { element: <main />, children: [{ path: "/", element: "home" }] },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
