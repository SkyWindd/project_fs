import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import DeliverySection from "../components/Checkout/DeliverySection";
import CustomerSection from "../components/Checkout/CustomerSection";
import PaymentSection from "../components/Checkout/PaymentSection";
import SummarySection from "../components/Checkout/SummarySection";
import LocationSelector from "../components/Location/LocationSelector";
import PaymentTransferModal from "../components/Payment/PaymentTransferModal";
import MomoModal from "../components/Payment/MomoModal";

import { createOrder } from "../lib/api";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedStore } = useStore();
  const { currentUser } = useAuth();

  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const [openMomo, setOpenMomo] = useState(false);
  const [openBanking, setOpenBanking] = useState(false);

  const [errors, setErrors] = useState({
    delivery: "",
    customer: "",
    payment: "",
  });

  if (!state?.cartItems || state.cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600 text-center">
        <p className="text-lg mb-2">Không có sản phẩm trong giỏ hàng</p>
        <Button onClick={() => navigate("/")}>Quay lại mua hàng</Button>
      </div>
    );
  }

  const { cartItems, subtotal, total } = state;

  // =========================
  //  VALIDATION
  // =========================
  const validateBeforeOrder = () => {
  const newErrors = { delivery: "", customer: "", payment: "" };
  let ok = true;

  if (!deliveryInfo?.address || !deliveryInfo?.latitude || !deliveryInfo?.longitude) {
    newErrors.delivery = "Vui lòng chọn địa chỉ giao hàng.";
    ok = false;
  }

  if (!currentUser) {
    newErrors.customer = "Bạn chưa đăng nhập.";
    ok = false;
  }

  if (!paymentMethod) {
    newErrors.payment = "Vui lòng chọn phương thức thanh toán.";
    ok = false;
  }

  setErrors(newErrors);
  return ok;
};

  // =========================
  //  HANDLE ORDER
  // =========================
  const handleOrder = async () => {
  if (!validateBeforeOrder()) {
    toast.error("Vui lòng kiểm tra lại thông tin trước khi thanh toán ⚠️");
    return;
  }

  if (!selectedStore) {
    toast.error("Bạn chưa chọn cửa hàng giao hàng ❗");
    return;
  }

  const payload = {
  user_id: currentUser!.user_id,
  store_id: selectedStore.store_id,

  address: deliveryInfo.address,
  latitude: deliveryInfo.latitude,
  longitude: deliveryInfo.longitude,

  note: deliveryInfo.note || "",
  payment_method: paymentMethod,

  cart: cartItems.map((i: any) => ({
    item_id: i.item_id,
    price: i.price,
    quantity: i.quantity
  })),
};


  console.log("📦 Payload gửi backend:", payload);

  try {
    const res = await createOrder(payload);
    toast.success(`Đặt hàng thành công! Mã đơn #${res.order_id}`);
    navigate("/profile?tab=orders");
  } catch (err: any) {
    toast.error(err.message || "Lỗi tạo đơn hàng ❌");
  }
};

  return (
    <>
      {/* Giữ DOM để LocationSelector hoạt động */}
      <div className="hidden">
        <LocationSelector />
      </div>

      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto mt-6 mb-2 px-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-700 hover:text-red-600"
          onClick={() => navigate(-1)}
        >
          ← Quay lại
        </Button>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          {/* Delivery */}
          <div>
            <DeliverySection onChange={setDeliveryInfo} />
            {errors.delivery && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.delivery}
              </p>
            )}
          </div>

          {/* Customer */}
          <div>
            <CustomerSection onChange={setCustomerInfo} />
            {errors.customer && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.customer}
              </p>
            )}
          </div>

          {/* Payment */}
          <div>
            <PaymentSection onChange={setPaymentMethod} />
            {errors.payment && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.payment}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <SummarySection
          cartItems={cartItems}
          subtotal={subtotal}
          total={total}
          onOrder={handleOrder}
        />

        {/* Banking modal */}
        <PaymentTransferModal
          open={openBanking}
          onClose={() => setOpenBanking(false)}
          totalAmount={total}
          customer={customerInfo}
          onConfirm={() => {
            toast.custom((t) => (
              <div className="bg-white border shadow-lg rounded-xl px-4 py-3 flex items-start gap-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Thanh toán thành công! 🎉</p>
                </div>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            ));
            navigate("/");
          }}
        />
      </div>

      {/* Momo modal */}
      <MomoModal
        open={openMomo}
        onClose={() => {
          setOpenMomo(false);
          navigate("/");
        }}
        totalAmount={total}
      />
    </>
  );
}
