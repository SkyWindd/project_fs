import { createBrowserRouter } from "react-router-dom"

// Layouts
import MainLayout from "../layout/MainLayout"

// Pages
import Home from "../pages/Home"
import Checkout from "../pages/Checkout"
import NotFound from "../pages/NotFound"
import AuthPage from "../pages/AuthPage"
import Profile from "../pages/Profile"
export const router = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
