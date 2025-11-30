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
      { path: "stores", element: <Stores /> },
      import React from "react";
import type { Category, MenuItem } from "../../../mock/mockData";

interface Props {
  category: Category;
  items: MenuItem[];
}

export default function CategorySection({ category, items }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-3">{category.category_name}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.item_id}
            className="border rounded-lg p-3 shadow-sm"
          >
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-500 text-sm">
              {item.price.toLocaleString()}đ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

    ],
  },

  // 404 fallback
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
