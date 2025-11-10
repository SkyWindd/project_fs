import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Plus, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "../../context/CartContext"  // ✅ Thêm dòng này

export default function ProductModal({
  open,
  onClose,
  product,
}: {
  open: boolean
  onClose: () => void
  product: {
    item_id: number
    name: string
    description?: string
    price: number
    image_url?: string
  }
}) {
  const { addToCart } = useCart() // ✅ Lấy hàm thêm giỏ hàng từ Context

  const [quantity, setQuantity] = React.useState(1)
  const [size, setSize] = React.useState<"small" | "medium" | "large">("medium")
  const [crust, setCrust] = React.useState<string>("classic")

  const handleIncrease = () => setQuantity((q) => q + 1)
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1))

  const sizePrice = size === "large" ? 30000 : size === "small" ? -20000 : 0
  const crustPrice =
    crust === "cheese" ? 25000 : crust === "sausage" ? 25000 : 0

  const totalPrice = (product.price + sizePrice + crustPrice) * quantity

  // ✅ Xử lý khi thêm sản phẩm vào giỏ
  const handleAddToCart = () => {
    addToCart({
      id: product.item_id,
      name: product.name,
      size: size === "small" ? "Nhỏ" : size === "large" ? "Lớn" : "Vừa",
      crust:
        crust === "classic"
          ? "Đế kéo tay truyền thống"
          : crust === "cheese"
          ? "Viền phô mai"
          : "Viền xúc xích",
      quantity,
      price: product.price + sizePrice + crustPrice,
      image_url: product.image_url || "/images/placeholder.jpg",
    })

    console.log("🛒 Đã thêm vào giỏ:", product.name)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] md:max-w-4xl max-h-[95vh] p-0 overflow-hidden rounded-2xl shadow-2xl bg-white flex flex-col">
        {/* Nội dung chính */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-2 h-full">
            {/* 🍕 Hình ảnh */}
            <div className="relative w-full h-56 sm:h-full overflow-hidden flex-shrink-0">
              <motion.img
                src={product.image_url || "/images/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
              />
            </div>

            {/* 🧾 Thông tin */}
            <div className="p-6 flex flex-col justify-between">
              <div className="flex-1 overflow-y-auto space-y-5">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-gray-900 leading-snug">
                    {product.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 text-sm mt-1">
                    {product.description || "Không có mô tả cho món này."}
                  </DialogDescription>
                </DialogHeader>

                <p className="text-orange-600 font-bold text-xl">
                  {product.price.toLocaleString()}₫
                </p>

                {/* ⚙️ Kích thước */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Kích thước
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "small", label: "Nhỏ", note: "-20.000₫" },
                      { key: "medium", label: "Vừa", note: "Chuẩn" },
                      { key: "large", label: "Lớn", note: "+30.000₫" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() =>
                          setSize(opt.key as "small" | "medium" | "large")
                        }
                        className={`flex flex-col justify-center items-center rounded-md border py-2 text-sm font-medium transition ${
                          size === opt.key
                            ? "bg-orange-500 text-white border-orange-500"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span
                          className={`text-xs ${
                            size === opt.key
                              ? "text-orange-50"
                              : "text-gray-500"
                          }`}
                        >
                          {opt.note}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 🍞 Đế bánh */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Đế bánh
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: "classic", label: "Đế kéo tay truyền thống", extra: 0 },
                      { id: "cheese", label: "Viền phô mai", extra: 25000 },
                      { id: "sausage", label: "Viền xúc xích", extra: 25000 },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setCrust(option.id)}
                        className={`w-full text-left px-4 py-2 rounded-md border text-sm flex justify-between items-center transition ${
                          crust === option.id
                            ? "border-orange-500 bg-orange-50 text-gray-900"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{option.label}</span>
                        {option.extra > 0 && (
                          <span className="text-gray-500 text-xs">
                            +{option.extra.toLocaleString()}₫
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ✏️ Ghi chú */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Ghi chú (tuỳ chọn)
                  </h3>
                  <textarea
                    placeholder="Ví dụ: không hành, thêm phô mai..."
                    className="w-full border border-gray-200 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    rows={3}
                    maxLength={120}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer cố định */}
        <div className="border-t border-gray-100 p-4 bg-white flex flex-col gap-3 sticky bottom-0">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrease}
              className="rounded-full border-gray-300 hover:bg-gray-100 w-10 h-10"
            >
              <Minus size={18} />
            </Button>
            <span className="text-lg font-semibold w-8 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrease}
              className="rounded-full border-gray-300 hover:bg-gray-100 w-10 h-10"
            >
              <Plus size={18} />
            </Button>
          </div>

          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white w-full py-3.5 min-h-[52px] rounded-md font-semibold text-[15px] shadow-md transition active:scale-95 tracking-wide"
            onClick={handleAddToCart} // ✅ Gọi hàm thêm giỏ hàng
          >
            Thêm vào giỏ hàng • {totalPrice.toLocaleString()}₫
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
