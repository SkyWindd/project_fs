import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import {
  User,
  LogIn,
  UserPlus,
  Package,
  Headphones,
  LogOut,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext" // ✅ Dùng context

export default function UserMenu() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth() // ✅ Lấy user & logout từ context

  const handleNavigate = (tab: "login" | "signup") => {
    navigate(`/auth?tab=${tab}`)
  }

    const handleProfile = () => navigate("/profile?tab=info")
  const handleOrders = () => navigate("/profile?tab=orders")

  return (
    <DropdownMenu>
      {/* 🔹 Nút mở menu */}
      <DropdownMenuTrigger asChild>
        {currentUser ? (
          <button
            className="rounded-full bg-red-50 p-1.5 border border-red-100 
                       hover:bg-red-100 transition-all duration-200 
                       active:scale-95 flex items-center justify-center"
          >
            {/* Avatar chữ cái đầu */}
            <span className="w-7 h-7 rounded-full bg-red-600 text-white text-sm font-semibold flex items-center justify-center">
              {currentUser.full_name?.charAt(0).toUpperCase() ?? "U"}
            </span>
          </button>
        ) : (
          <button
            className="rounded-full border p-1.5 hover:bg-gray-50 transition-all duration-200
                       hover:shadow-sm active:scale-[0.97] flex items-center justify-center"
          >
            <User className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </DropdownMenuTrigger>

      {/* 🔹 Nội dung menu */}
      <DropdownMenuContent
        align="end"
        className="w-56 mt-1 rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100/80
                   animate-in fade-in slide-in-from-top-2 duration-150"
      >
        {!currentUser ? (
          <>
            <DropdownMenuItem
              onClick={() => handleNavigate("login")}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogIn className="w-4 h-4 opacity-80" />
              <span>Đăng nhập</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleNavigate("signup")}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 opacity-80" />
              <span>Đăng ký</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.full_name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser.email}
              </p>
            </div>

            <DropdownMenuItem
              onClick={handleProfile}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <User className="w-4 h-4 opacity-80" />
              <span>Thông tin tài khoản</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleOrders}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Package className="w-4 h-4 opacity-80" />
              <span>Theo dõi đơn hàng</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout} // ✅ Gọi hàm logout từ context
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4 opacity-80" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
