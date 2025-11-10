import React, { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../../context/CartContext"
import CartItemCard from "./CartItemCard"
import { useNavigate, useLocation } from "react-router-dom"
interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // ✅ Ẩn Cart khi sang trang checkout
  useEffect(() => {
    if (pathname === "/checkout" && open) {
      onClose()
    }
  }, [pathname, open, onClose])

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const total = subtotal

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", duration: 0.35 }}
            className="fixed top-0 right-0 w-full sm:w-[420px] h-screen bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Giỏ hàng {cartItems.length > 0 ? `(${cartItems.length})` : ""}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
                  <p className="font-medium text-lg mb-1">
                    Giỏ hàng của bạn đang trống!
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Hãy chọn món yêu thích và thêm vào giỏ hàng nhé 🍕
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3 bg-white">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính</span>
                  <span className="font-medium">{subtotal.toLocaleString()}₫</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold text-lg text-gray-900">
                      Tổng cộng: {total.toLocaleString()}₫
                    </p>
                  </div>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Xóa tất cả
                  </button>
                </div>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-[15px] py-3 rounded-lg font-semibold shadow-md transition active:scale-95"
                  onClick={() =>
                    navigate("/checkout", {
                    state: { cartItems, subtotal, total },
                    })
                }
                >
                  Thanh Toán
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
