import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card"
import { Checkbox } from "../../components/ui/checkbox"
import { Button } from "../../components/ui/button"

interface CartItem {
  item_id: number
  name: string
  price: number
  quantity: number
  size?: string
  crust?: string
  category_id?: number
  image_url?: string
}

interface SummarySectionProps {
  cartItems: CartItem[]
  subtotal: number
  total: number
  onOrder: (total: number) => void
}

export default function SummarySection({
  cartItems,
  subtotal,
  total,
  onOrder,
}: SummarySectionProps) {
  return (
    <aside className="space-y-5">

      {/* 🧾 GIỎ HÀNG */}
      <Card className="shadow-sm border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Giỏ hàng của tôi
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Có {cartItems.length} sản phẩm trong giỏ hàng
          </p>

          {/* DANH SÁCH SẢN PHẨM */}
        <ul className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <li
                key={`${item.item_id}-${item.size || ""}-${item.crust || ""}`}
                className="flex items-center justify-between gap-3 py-4"
              >

                {/* LEFT: Image + Info */}
                <div className="flex items-center gap-4">

                  {/* IMAGE */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                    <img
                      src={item.image_url || "/images/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* TEXT INFO */}
                  <div className="flex flex-col">
                    {/* NAME */}
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {item.name}
                    </p>

                    {/* Size + Crust (pizza only) */}
                    {item.category_id === 1 && (
                      <p className="text-[11px] text-gray-500 mt-1">
                        <span className="font-medium text-gray-600">Cỡ:</span> {item.size} &nbsp;•&nbsp;
                        <span className="font-medium text-gray-600">Đế:</span> {item.crust}
                      </p>
                    )}

                    {/* QUANTITY */}
                    <p className="text-xs text-gray-500 mt-1">x{item.quantity}</p>
                  </div>
                </div>

                {/* RIGHT: PRICE */}
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900 block">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </span>
                </div>

              </li>
            ))}
          </ul>


          {/* TỔNG KẾT */}
          <div className="bg-gray-50 p-4 rounded-xl border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tạm tính</span>
              <span className="font-medium">{subtotal.toLocaleString()}₫</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Phí giao hàng</span>
              <span className="font-medium">0₫</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
              <span>Tổng cộng</span>
              <span className="text-red-600 font-bold">
                {total.toLocaleString()}₫
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NÚT ĐẶT HÀNG */}
      <Card className="shadow-sm border border-gray-200 rounded-2xl">
        <CardContent className="space-y-4 pt-5">

          {/* CHECKBOX */}
          <div className="flex items-start gap-3">
            <Checkbox id="agree" defaultChecked />

            <label
              htmlFor="agree"
              className="text-sm leading-snug text-gray-700 cursor-pointer"
            >
              Tôi đồng ý với các điều khoản & điều kiện của cửa hàng
            </label>
          </div>

          {/* BUTTON */}
          <Button
            className="
              w-full py-3 rounded-xl shadow-md 
              bg-red-600 hover:bg-red-700 text-white font-semibold 
              active:scale-[0.98] transition-all
            "
            onClick={() => onOrder(total)}          >
            Đặt hàng ngay
          </Button>
        </CardContent>
      </Card>

    </aside>
  )
}
