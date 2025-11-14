import { Link } from "react-router-dom"
import LocationSelector from "../Location/LocationSelector"
import CartIcon from "./CartIcon"
import UserMenu from "./UserMenu"
import { useResponsive } from "../../hooks/useResponsive"
import { useCart } from "../../context/CartContext"

export default function HeaderTop({ scrolled }: { scrolled: boolean }) {
  const { isMobile } = useResponsive()
  const { cartItems } = useCart()

  return (
    <div
      className={`relative max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
        scrolled ? "py-2 md:py-2" : "py-3 md:py-4"
      }`}
    >
      {/* Địa chỉ / Location */}
      <div
        className={`flex flex-col items-start justify-center ${
          isMobile ? "min-w-[40px]" : "min-w-[140px] max-w-[230px]"
        }`}
      >
        {/* ✅ Chỉ render 1 component LocationSelector — không cần hiển thị lại address */}
        <LocationSelector />
      </div>

      {/* Logo giữa */}
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

      {/* Cột phải: Giỏ hàng + User */}
      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        <CartIcon />
        <UserMenu />
      </div>
    </div>
  )
}
