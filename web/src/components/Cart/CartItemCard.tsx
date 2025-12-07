import React from "react"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { motion, useAnimation } from "framer-motion"
import { useCart } from "../../context/CartContext"

export default function CartItemCard({ item }: { item: any }) {
  const { updateQuantity, removeFromCart } = useCart()
  const controls = useAnimation()
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const [showDelete, setShowDelete] = React.useState(false)

  const handleDragEnd = async (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    if (info.offset.x < -50) {
      setShowDelete(true)
      await controls.start({
        x: -85,
        transition: { type: "tween", duration: 0.25, ease: "easeOut" },
      })
    } else {
      setShowDelete(false)
      await controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 250, damping: 25 },
      })
    }
  }

  const handleDelete = async () => {
    await controls.start({
      opacity: 0,
      x: -100,
      transition: { duration: 0.25, ease: "easeInOut" },
    })

    removeFromCart(item.item_id)   // ← FIXED
  }

  return (
    <motion.div className="relative overflow-hidden">
      {/* Nút xoá khi vuốt */}
      {isMobile && (
        <motion.button
          onClick={handleDelete}
          className={`absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-1 shadow-md active:scale-95 transition ${
            showDelete ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showDelete ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Trash2 size={14} />
          Xóa
        </motion.button>
      )}

      {/* Card sản phẩm */}
      <motion.div
        animate={controls}
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: -90, right: 0 }}
        dragElastic={0.25}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.985 }}
        className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative z-10"
      >
        <img
          src={item.image_url}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />

        <div className="flex flex-col flex-1 ml-3">
          <div className="flex justify-between items-start w-full">
            <div>
              <p className="font-semibold text-sm text-gray-900 leading-tight">
                {item.name}
              </p>

              {item.category_id === 1 && (
                <p className="text-xs text-gray-500 mt-0.5">
                  Cỡ: {item.size} • Đế: {item.crust}
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-1 w-[80px]">
              <button
                onClick={handleDelete}
                className="w-full text-gray-400 hover:text-red-500 transition flex justify-end"
                title="Xóa sản phẩm"
              >
                <X size={16} />
              </button>

              <p className="text-sm font-semibold text-gray-900 text-right">
                {(item.price * item.quantity).toLocaleString()}₫
              </p>
            </div>
          </div>

          {/* Tăng giảm số lượng */}
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full border-gray-300 hover:bg-gray-100"
              onClick={() =>
                updateQuantity(item.item_id, Math.max(1, item.quantity - 1)) // ← FIXED
              }
            >
              <Minus size={12} />
            </Button>

            <span className="text-sm font-medium text-gray-800 w-5 text-center">
              {item.quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full border-gray-300 hover:bg-gray-100"
              onClick={() =>
                updateQuantity(item.item_id, item.quantity + 1)   // ← FIXED
              }
            >
              <Plus size={12} />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
