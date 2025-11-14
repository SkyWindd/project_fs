import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "../components/ui/button"
import { AlertCircle, CheckCircle2} from "lucide-react"

import DeliverySection from "../components/Checkout/DeliverySection"
import CustomerSection from "../components/Checkout/CustomerSection"
import PaymentSection from "../components/Checkout/PaymentSection"
import SummarySection from "../components/Checkout/SummarySection"
import LocationSelector from "../components/Location/LocationSelector"
import PaymentTransferModal from "../components/Payment/PaymentTransferModal"
import MomoModal from "../components/Payment/MomoModal"

export default function Checkout() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [deliveryInfo, setDeliveryInfo] = useState<any>(null)
  const [customerInfo, setCustomerInfo] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [openMomo, setOpenMomo] = useState(false)
  const [openBanking, setOpenBanking] = useState(false)
  const [openTransfer, setOpenTransfer] = useState(false);
  const [errors, setErrors] = useState({
    delivery: "",
    customer: "",
    payment: "",
  })

  if (!state?.cartItems || state.cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600 text-center">
        <p className="text-lg mb-2">Không có sản phẩm trong giỏ hàng</p>
        <Button onClick={() => navigate("/")}>Quay lại mua hàng</Button>
      </div>
    )
  }

  const { cartItems, subtotal, total } = state

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

  const handleOrder = () => {
    if (!validateBeforeOrder()) {
      toast.error("Vui lòng kiểm tra lại thông tin trước khi thanh toán ⚠️")
      return
    }

    // 🔥 Nếu chọn MoMo → mở modal mô phỏng
    if (paymentMethod === "momo") {
      setOpenMomo(true)
      return
    }
      if (paymentMethod === "banking") {
    setOpenTransfer(true); 
    setOpenBanking(true)
    return
  }
  }

  return (
    <>
      {/* ⛔ Ẩn nhưng giữ trong DOM để LocationSelector hoạt động */}
      <div className="hidden">
        <LocationSelector />
      </div>

      {/* Back button */}
      <div className="max-w-6xl mx-auto mt-6 mb-2 px-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          ← Quay lại
        </Button>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
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

        <SummarySection
          cartItems={cartItems}
          subtotal={subtotal}
          total={total}
          onOrder={handleOrder}
        />
       <PaymentTransferModal
        open={openBanking}
        onClose={() => setOpenBanking(false)}
        totalAmount={total}       // 🟢 gửi đúng total
        customer={customerInfo}   // 🟢 thông tin khách hàng
        onConfirm={() => {
          toast.custom(
            (t) => (
              <div
                className="bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3"
              >
                {/* Icon Success */}
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={20} />
                </div>

                {/* Nội dung */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Thanh toán thành công! 🎉
                  </p>

                  <p className="text-sm text-gray-600 mt-0.5 leading-snug">
                    Bạn có thể theo dõi trạng thái đơn hàng tại{" "}
                    <span className="font-semibold text-red-600">
                      Theo dõi đơn hàng
                    </span>{" "}
                    trong phần tài khoản.
                  </p>
                </div>

                {/* Nút đóng */}
                <button
                  onClick={() => toast.dismiss(t)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>
            ),
            { duration: 4500 }
            );          
            navigate("/")
        }}
      />
      </div>

      {/* 🟣 MODAL THANH TOÁN MOMO */}
      <MomoModal
        open={openMomo}
        onClose={() => {
          setOpenMomo(false)
          navigate("/")
        }}
        totalAmount={total}
      />
    </>
  )
}
