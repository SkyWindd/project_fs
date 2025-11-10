import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import { User, LogIn, UserPlus, Package, Headphones } from "lucide-react"

export default function UserMenu() {
  return (
    <DropdownMenu>
      {/* 🔹 Nút trigger */}
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-full border p-1.5 hover:bg-gray-50 transition-all duration-200
                     hover:shadow-sm active:scale-[0.97] flex items-center justify-center"
        >
          <User className="w-5 h-5 text-gray-700" />
        </button>
      </DropdownMenuTrigger>

      {/* 🔹 Nội dung menu */}
      <DropdownMenuContent
        align="end"
        className="w-52 mt-1 rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100/80
                   animate-in fade-in slide-in-from-top-2 duration-150"
      >
        <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
          <LogIn className="w-4 h-4 opacity-80" />
          <span>Đăng nhập</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
          <UserPlus className="w-4 h-4 opacity-80" />
          <span>Đăng ký</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
          <Package className="w-4 h-4 opacity-80" />
          <span>Theo dõi đơn hàng</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
          <Headphones className="w-4 h-4 opacity-80" />
          <span>Hỗ trợ khách hàng</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
