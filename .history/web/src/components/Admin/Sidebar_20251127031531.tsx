import { LayoutDashboard, Package, ShoppingCart, Plane, Users } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { ScrollArea } from "../../components/ui/scroll-area"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Đơn hàng", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Sản phẩm", icon: Package, path: "/admin/products" },
  { name: "Drone", icon: Plane, path: "/admin/drones" },
  { name: "Người dùng", icon: Users, path: "/admin/users" }, // 👤 Thêm mục Users
  { name: "Chi nhánh", icon: Package, path: "/admin/stores" }, // 🏬 Thêm mục Stores
]

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">
      <Card className="border-0 shadow-none flex-1">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center">🍕 DronePizza</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <nav className="flex flex-col gap-1 px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition font-medium ${
                      isActive
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </ScrollArea>
        </CardContent>
      </Card>
    </aside>
  )
}
