import React, { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import ProductModal from "./ProductModal"
import { toast } from "sonner"
import { useLocationContext } from "../../context/LocationContext" // ✅ import context

interface ProductCardProps {
  product: {
    item_id: number
    name: string
    image_url?: string
    price: number
    description?: string
    category_id: number
  }
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [open, setOpen] = useState(false)
  const { fullAddress } = useLocationContext() // ✅ lấy địa chỉ hiện tại

 const handleOpenModal = () => {
  if (!fullAddress) {
    toast.warning("Vui lòng chọn địa chỉ giao hàng trước khi chọn món 🍕")
    window.dispatchEvent(new Event("open-location-modal")) // ✅ Mở LocationSelector
    return
  }
  setOpen(true)
} 

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card className="hover:shadow-xl transition-all cursor-pointer group rounded-2xl overflow-hidden bg-white border border-gray-100">
          <CardContent className="p-4 flex flex-col h-full justify-between">
            {/* Ảnh sản phẩm */}
            <div className="relative overflow-hidden rounded-xl">
              <motion.img
                src={product.image_url || "/images/placeholder.jpg"}
                alt={product.name}
                className="w-full h-44 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="mt-4 flex flex-col flex-1">
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-orange-600 font-bold text-sm sm:text-base">
                {product.price.toLocaleString()}₫
              </p>
            </div>

            {/* Nút thêm (+) */}
            <div className="flex justify-end mt-4">
              <Button
                size="icon"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md w-9 h-9 active:scale-95 transition"
                onClick={handleOpenModal} // ✅ Kiểm tra trước khi mở
              >
                <Plus size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal chi tiết sản phẩm */}
      {open && (
        <ProductModal
          open={open}
          onClose={() => setOpen(false)}
          product={product}
        />
      )}
    </>
  )
}
