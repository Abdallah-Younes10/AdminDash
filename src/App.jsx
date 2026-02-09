import { Children, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { Home } from "./Components/Home/Home";
import { Users } from "./Components/Users";
import { Products } from "./Components/Products";
import { Orders } from "./Components/Orders";
import { Settings } from "./Components/Settings";
import { Login } from "./Components/Login";
import { ProtectedRoute } from "./Components/Layout/ProtectedRoute";
import { useDispatch } from "react-redux";
import { setTheme } from "./Radux/ThemeSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    dispatch(setTheme(isDark));
  }, [dispatch]);

  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { index: true, element: <Home /> },
            { path: "users", element: <Users /> },
            { path: "products", element: <Products /> },
            { path: "orders", element: <Orders /> },
            { path: "settings", element: <Settings /> },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
