import { createBrowserRouter } from "react-router-dom"

// Layouts
import MainLayout from "../layout/MainLayout"

// Pages
import Home from "../pages/Home"
import Checkout from "../pages/Checkout"
import NotFound from "../pages/NotFound"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Layout chung có Header, Footer
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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])
