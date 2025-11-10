import React, { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../../context/CartContext"
import CartDrawer from "../Cart/CartDrawer"

export default function CartIcon() {
  const [openCart, setOpenCart] = useState(false)
  const { cartItems } = useCart()

  // ✅ Tính tổng số lượng sản phẩm trong giỏ
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* 🛒 Nút mở giỏ hàng */}
      <button
        onClick={() => setOpenCart(true)}
        className="relative hover:scale-[1.05] active:scale-[0.97] transition-transform"
      >
        {/* Hiệu ứng nhẹ khi số lượng thay đổi */}
        <motion.div
          key={count}
          animate={count > 0 ? { rotate: [0, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />
        </motion.div>

        {/* 🔴 Badge luôn hiển thị (kể cả khi = 0) */}
        <motion.span
          key={`badge-${count}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={`absolute -top-2 -right-2 text-white text-xs px-1.5 rounded-full shadow-sm ${
            count > 0 ? "bg-red-500" : "bg-gray-300"
          }`}
        >
          {count}
        </motion.span>
      </button>

      {/* 🧺 Drawer hiển thị danh sách giỏ hàng */}
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </>
  )
}
