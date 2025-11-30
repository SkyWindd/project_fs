import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

// Pages người dùng
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import AuthPage from "../pages/AuthPage";
import Profile from "../pages/Profile";

// Pages admin
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Order";
import Products from "../pages/Product";
import Drones from "../pages/Drone";
import Users from "../pages/Users";
import Stores from "../pages/Store";

export const router = createBrowserRouter([
  // 🌿 Layout người dùng
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "checkout", element: <Checkout /> },
      { path: "auth", element: <AuthPage /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  // 🧭 Layout admin
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "products", element: <Products /> },
      { path: "drones", element: <Drones /> },
      { path: "users", element: <Users /> },
    ],
  },

  // 404 fallback
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
