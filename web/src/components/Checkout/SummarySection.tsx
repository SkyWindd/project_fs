import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card"
import { Checkbox } from "../../components/ui/checkbox"
import { Button } from "../../components/ui/button"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image_url?: string // ✅ thêm ảnh
}

interface SummarySectionProps {
  cartItems: CartItem[]
  subtotal: number
  total: number
  onOrder: () => void
}

export default function SummarySection({
  cartItems,
  subtotal,
  total,
  onOrder,
}: SummarySectionProps) {
  return (
    <aside className="space-y-4">
      {/* 🧾 Giỏ hàng */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Giỏ hàng của tôi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Có {cartItems.length} sản phẩm trong giỏ hàng
          </p>

          {/* 🧱 Danh sách sản phẩm */}
          <ul className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                {/* Ảnh + tên */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden border">
                    <img
                      src={item.image_url || "/images/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      × {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Giá */}
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Tổng kết */}
          <div className="border-t pt-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí giao hàng</span>
              <span>0₫</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Giảm giá thành viên</span>
              <span>0₫</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-semibold text-lg text-gray-900">
              <span>Tổng cộng</span>
              <span>{total.toLocaleString()}₫</span>
            </div>
            <p className="text-xs text-gray-500">
              Nhận {(subtotal / 10000).toFixed(0)} điểm Pizza Rewards
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Điều khoản + nút đặt hàng */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="space-y-4 pt-5">
          <div className="flex items-center space-x-2">
            <Checkbox id="agree" defaultChecked />
            <label
              htmlFor="agree"
              className="text-sm text-gray-700 cursor-pointer leading-tight"
            >
              Tôi đồng ý với các điều khoản & điều kiện
            </label>
          </div>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow active:scale-95"
            onClick={onOrder}
          >
            Đặt hàng
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}
