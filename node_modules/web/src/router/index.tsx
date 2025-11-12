import { createBrowserRouter } from "react-router-dom"

// Layouts
import MainLayout from "../layout/MainLayout"
import AdminLayout from "../layout/AdminLayout"

// Pages người dùng
import Home from "../pages/Home"
import Checkout from "../pages/Checkout"
import NotFound from "../pages/NotFound"

// Pages admin
import Dashboard from "../pages/Dashboard"
import Orders from "../pages/Order"
import Products from "../pages/Product"
import Drones from "../pages/Drone"
import Users from "../pages/Users" // 👈 thêm dòng này

export const router = createBrowserRouter([
  // 🌿 Layout người dùng
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "checkout", element: <Checkout /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  // 🧭 Layout admin
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> }, // /admin
      { path: "orders", element: <Orders /> }, // /admin/orders
      { path: "products", element: <Products /> }, // /admin/products
      { path: "drones", element: <Drones /> }, // /admin/drones
      { path: "users", element: <Users /> }, // ✅ thêm dòng này
    ],
  },
])
