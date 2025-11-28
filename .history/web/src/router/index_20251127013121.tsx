import { createBrowserRouter } from "react-router-dom"

// Layouts
import MainLayout from "../layout/MainLayout"
import AdminLayout from "../layout/AdminLayout"

// Pages người dùng
import Home from "../pages/Home"
import Checkout from "../pages/Checkout"
import NotFound from "../pages/NotFound"
import AuthPage from "../pages/AuthPage"
import Profile from "../pages/Profile"

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
<<<<<<< HEAD
    element: <MainLayout />, // ✅ Tất cả các trang con sẽ có header/footer
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "auth", // ✅ Trang login/register nằm trong layout
        element: <AuthPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
=======
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
>>>>>>> Đạt
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
