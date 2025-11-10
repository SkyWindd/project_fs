import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "../components/ui/button"
import { AlertCircle, Pizza } from "lucide-react"
import DeliverySection from "../components/Checkout/DeliverySection"
import CustomerSection from "../components/Checkout/CustomerSection"
import PaymentSection from "../components/Checkout/PaymentSection"
import SummarySection from "../components/Checkout/SummarySection"

export default function Checkout() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // ✅ Lưu dữ liệu người dùng nhập
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null)
  const [customerInfo, setCustomerInfo] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

  // ✅ Quản lý lỗi hiển thị cảnh báo từng phần
  const [errors, setErrors] = useState({
    delivery: "",
    customer: "",
    payment: "",
  })

  // Nếu không có giỏ hàng, quay về trang chủ
  if (!state?.cartItems || state.cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600 text-center">
        <p className="text-lg mb-2">Không có sản phẩm trong giỏ hàng</p>
        <Button onClick={() => navigate("/")}>Quay lại mua hàng</Button>
      </div>
    )
  }

  const { cartItems, subtotal, total } = state

  // ✅ Validate trước khi thanh toán
  const validateBeforeOrder = () => {
    const newErrors = { delivery: "", customer: "", payment: "" }
    let valid = true

    if (!deliveryInfo) {
      newErrors.delivery = "Vui lòng chọn địa chỉ giao hàng."
      valid = false
    }
    if (!customerInfo) {
      newErrors.customer = "Vui lòng nhập thông tin khách hàng."
      valid = false
    }
    if (!paymentMethod) {
      newErrors.payment = "Vui lòng chọn phương thức thanh toán."
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  // ✅ Khi bấm Thanh toán
  const handleOrder = () => {
    if (!validateBeforeOrder()) {
      toast.error("Vui lòng kiểm tra lại thông tin trước khi thanh toán ⚠️")
      return
    }

    toast.custom(() => (
      <div className="flex items-center gap-3 px-2">
        <div className="bg-orange-500 text-white p-2 rounded-full shadow-md">
          <Pizza size={20} />
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            Cảm ơn bạn đã đặt hàng PizzaHouse! 🍕
          </p>
          <p className="text-sm text-gray-600">
            Chúng tôi đang chuẩn bị món ngon cho bạn.
          </p>
        </div>
      </div>
    ), {
      duration: 4000,
      closeButton: true,
      classNames: {
        toast: "bg-white shadow-lg border border-gray-100 rounded-xl py-3",
      },
    })

    setTimeout(() => navigate("/"), 1000)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* 🧱 Cột trái - Thông tin giao hàng & thanh toán */}
      <div className="space-y-6">
        <div>
          <DeliverySection onChange={setDeliveryInfo} />
          {errors.delivery && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.delivery}
            </p>
          )}
        </div>

        <div>
          <CustomerSection onChange={setCustomerInfo} />
          {errors.customer && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.customer}
            </p>
          )}
        </div>

        <div>
          <PaymentSection onChange={setPaymentMethod} />
          {errors.payment && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.payment}
            </p>
          )}
        </div>
      </div>

      {/* 💰 Cột phải - Tổng kết đơn hàng */}
      <SummarySection
        cartItems={cartItems}
        subtotal={subtotal}
        total={total}
        onOrder={handleOrder}
      />
    </div>
  )
}
