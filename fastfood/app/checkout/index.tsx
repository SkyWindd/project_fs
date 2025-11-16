import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AlertCircle } from "lucide-react-native";
import { Route, router } from "expo-router";
import DeliverySection from "../../components/CheckOut/DeliverySection";
import CustomerSection from "../../components/CheckOut/CustomerSection";
import PaymentSection from "../../components/CheckOut/PaymentSection";
import SummarySection from "../../components/CheckOut/SummarySection";
import MapPicker from "../../components/Location/MapPicker";
import MomoModal from "@/components/Payment/MomoModal";
import PaymentTransferModal from "@/components/Payment/PaymentTransferModal";
export default function CheckoutScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();

  // 🟢 Nhận dữ liệu giỏ hàng đúng cách
    const cartItems = route.params?.cartItems
    ? JSON.parse(route.params.cartItems)
    : [];
    const subtotal = Number(route.params?.subtotal ?? 0);
    const total = Number(route.params?.total ?? 0);


  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    delivery: "",
    customer: "",
    payment: "",
  });

  // 🌍 MapPicker
  const [openMap, setOpenMap] = useState(false);
  const [mapCallback, setMapCallback] = useState<any>(null);
  const [openMomo, setOpenMomo] = useState(false);
  const [openBanking, setOpenBanking] = useState(false);
  // Nếu giỏ hàng rỗng → quay lại trang chủ
  if (!cartItems || cartItems.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-gray-600 mb-2 text-lg">
          Không có sản phẩm trong giỏ hàng
        </Text>

        <TouchableOpacity
          onPress={() => (navigation as any).navigate("Home")}
          className="bg-red-600 px-4 py-2 rounded-xl"
        >
          <Text className="text-white font-semibold">Quay lại mua hàng</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* -------------------------------
      VALIDATE
  -------------------------------- */
  const validate = () => {
    const newErrors = { delivery: "", customer: "", payment: "" };
    let ok = true;

    if (!deliveryInfo) {
      newErrors.delivery = "Vui lòng chọn địa chỉ giao hàng.";
      ok = false;
    }

    if (!customerInfo) {
      newErrors.customer = "Vui lòng nhập thông tin khách hàng.";
      ok = false;
    }

    if (!paymentMethod) {
      newErrors.payment = "Vui lòng chọn phương thức thanh toán.";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  /* -------------------------------
      CHECKOUT
  -------------------------------- */
  const handleCheckout = () => {
  if (!validate()) {
    Alert.alert("Lỗi", "Vui lòng kiểm tra lại thông tin trước khi thanh toán.");
    return;
  }

  // 🔥 Kiểm tra phương thức thanh toán
  if (paymentMethod === "momo") {
    setOpenMomo(true);
    return;
  }

  if (paymentMethod === "banking") {
    setOpenBanking(true);
    return;
  }

  Alert.alert("Lỗi", "Phương thức thanh toán không hợp lệ.");
};

  return (
    <>
      {/* 🌍 MAP PICKER */}
      {openMap && (
        <MapPicker
          onSelectLocation={(addr, lat, lon) => {
            if (mapCallback) mapCallback(addr, lat, lon);
            setOpenMap(false);
          }}
          onClose={() => setOpenMap(false)}
        />
      )}

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        
        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mb-4"
        >
          <Text className="text-red-600 font-semibold">← Quay lại</Text>
        </TouchableOpacity>

        {/* DELIVERY SECTION */}
        <DeliverySection
          onChange={setDeliveryInfo}
          openMapPicker={(cb) => {
            setMapCallback(() => cb);
            setOpenMap(true);
          }}
        />

        {errors.delivery ? (
          <Text className="text-red-500 mt-1 flex-row items-center">
            <AlertCircle size={14} color="red" /> {errors.delivery}
          </Text>
        ) : null}

        {/* CUSTOMER SECTION */}
        <CustomerSection onChange={setCustomerInfo} />

        {errors.customer ? (
          <Text className="text-red-500 mt-1">
            <AlertCircle size={14} color="red" /> {errors.customer}
          </Text>
        ) : null}

        {/* PAYMENT SECTION */}
        <PaymentSection onChange={setPaymentMethod} />

        {errors.payment ? (
          <Text className="text-red-500 mt-1">
            <AlertCircle size={14} color="red" /> {errors.payment}
          </Text>
        ) : null}

        {/* SUMMARY */}
        <SummarySection
          cartItems={cartItems}
          subtotal={subtotal}
          total={total}
          onOrder={handleCheckout}
        />
      </ScrollView>
        {/* 🔴 MOMO MODAL */}
        <MomoModal
        open={openMomo}
        totalAmount={total}
        onClose={() => setOpenMomo(false)}
        onSuccess={() => {
            setOpenMomo(false);
            router.push("/")
        }}
        />

        {/* 🔵 BANKING MODAL */}
        <PaymentTransferModal
        open={openBanking}
        totalAmount={total}
        customer={customerInfo}
        onClose={() => setOpenBanking(false)}
        onSuccess={() => {
            setOpenBanking(false);
            router.push("/");
        }}
        />

    </>
  );
}
