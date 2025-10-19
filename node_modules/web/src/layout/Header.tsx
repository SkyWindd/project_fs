import { useState } from "react"
import { ShoppingCart, User, Search } from "lucide-react"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import LocationSelector from "../components/Location/LocationSelector"
import { useResponsive } from "../hooks/useResponsive"

export default function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const [userLocation, setUserLocation] = useState<string>("")
  const { isMobile } = useResponsive() // ✅ hook phát hiện mobile

  // Rút gọn chuỗi địa chỉ
  const shortenAddress = (addr: string) => {
    if (isMobile) return addr.length > 10 ? addr.slice(0, 10) + "..." : addr
    return addr.length > 60 ? addr.slice(0, 60) + "..." : addr
  }

  const categories = [
    { name: "Pizza", link: "/menu/pizza" },
    { name: "Gà", link: "/menu/ga" },
    { name: "Combo", link: "/menu/combo" },
    { name: "Khai vị", link: "/menu/khai-vi" },
    { name: "Món mới", link: "/menu/mon-moi" },
    { name: "Kids Menu", link: "/menu/kids" },
    { name: "Ưu đãi", link: "/menu/uudai" },
  ]

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      {/* ---------- PHẦN TRÊN ---------- */}
      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Địa chỉ / Location */}
        <div
          className={`flex flex-col items-start justify-center ${
            isMobile ? "min-w-[40px]" : "min-w-[140px] max-w-[230px]"
          }`}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <LocationSelector onConfirm={(addr) => setUserLocation(addr)} />
          </div>
        </div>

        {/* Logo giữa */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="flex items-center gap-2">
            <h1
              className={`font-bold text-xl md:text-2xl text-red-600 tracking-wider font-[Birthstone] ${
                isMobile ? "text-lg" : ""
              }`}
            >
              PIZZAHOUSE
            </h1>
          </Link>
        </div>

        {/* Cột phải: Giỏ hàng + User */}
        <div className="flex items-center gap-4 md:gap-6 ml-auto">
          {/* Giỏ hàng */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              2
            </span>
          </Link>

          {/* Dropdown user */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full border p-1 hover:bg-gray-100 transition">
                <User className="w-6 h-6 text-gray-700" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Đăng nhập</DropdownMenuItem>
              <DropdownMenuItem>Đăng ký</DropdownMenuItem>
              <DropdownMenuItem>Theo dõi đơn hàng</DropdownMenuItem>
              <DropdownMenuItem>Hỗ trợ khách hàng</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ---------- PHẦN DƯỚI (DANH MỤC) ---------- */}
      {!isMobile && (
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 overflow-x-auto scrollbar-hide">
            {/* Nút tìm kiếm */}
            <button
              className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* Thanh danh mục */}
            <div className="flex-1 flex justify-center">
              <div className="flex gap-8 text-sm md:text-base font-medium whitespace-nowrap">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.link}
                    className="text-gray-700 hover:text-red-600 transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Spacer giữ cân đối hai bên */}
            <div className="w-8" />
          </div>

          {/* Thanh tìm kiếm khi click */}
          {showSearch && (
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
              <Input
                placeholder="Tìm món ăn, combo..."
                className="w-full text-sm md:text-base"
              />
            </div>
          )}
        </div>
      )}
    </header>
  )
}
