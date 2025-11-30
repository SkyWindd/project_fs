import { Link } from "react-router-dom"
import LocationSelector from "../Location/LocationSelector"
import CartIcon from "./CartIcon"
import UserMenu from "./UserMenu"
import { useResponsive } from "../../hooks/useResponsive"
import { useCart } from "../../context/CartContext"
import { useStore } from "../../context/StoreContext"
import { Store } from "lucide-react"
import StoreSelector from "./StoreSelector"
export default function HeaderTop({ scrolled }: { scrolled: boolean }) {
  const { isMobile } = useResponsive()
  const { cartItems } = useCart()
  const { selectedStore } = useStore()

  return (
    <div
      className={`relative max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
        scrolled ? "py-2 md:py-2" : "py-3 md:py-4"
      }`}
    >
      {/* Địa chỉ */}
      <div
        className={`flex flex-col items-start justify-center ${
          isMobile ? "min-w-[40px]" : "min-w-[140px] max-w-[230px]"
        }`}
      >
        <LocationSelector />
      </div>

      {/* Cửa hàng */}
      <button
        onClick={() => window.dispatchEvent(new Event("open-store-modal"))}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition"
      >
        <Store size={18} className="text-red-500" />
        {selectedStore ? (
          <span>{selectedStore.store_name}</span>
        ) : (
          <span>Chọn cửa hàng</span>
        )}
      </button>

      {/* Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link to="/" className="flex items-center gap-2">
          <h1
            className={`font-bold tracking-wider font-[Birthstone] text-red-600 transition-all duration-300 ${
              scrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
            }`}
          >
            PIZZAHOUSE
          </h1>
        </Link>
      </div>

      {/* Cart + User */}
      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        <CartIcon />
        <UserMenu />
      </div>

      {/* 👇 Modal chọn cửa hàng */}
      <StoreSelector />
    </div>
  )
}

