import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { X } from "lucide-react-native";
import { useCart } from "../../context/CartContext";
import CartItemCard from "./CartItemCard";
import { useRouter, usePathname } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast/Toast";  // ⭐ Toast mới
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const { show } = useToast(); // ⭐ sử dụng toast mới

  useEffect(() => {
    if (pathname === "/checkout" && open) onClose();
  }, [pathname, open]);

  const subtotal = cartItems.reduce(
    (t, item) => t + item.price * item.quantity,
    0
  );

  const total = subtotal;
  const insets = useSafeAreaInsets(); 
  return (
    <Modal visible={open} transparent animationType="slide">
    <Pressable
      className="flex-1 bg-black/40"
      onPress={onClose}
      android_ripple={{ color: "#00000020" }}
    />

    <View
      className="absolute right-0 top-0 h-full w-full bg-white shadow-xl"
      style={{
        paddingTop: insets.top,     // ⭐ FIX TRÀN
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
    >
      {/* HEADER */}
      <View className="flex-row items-center justify-between border-b border-gray-200 pb-3 mb-2">
        <Text className="text-lg font-semibold">
          Giỏ hàng {cartItems.length ? `(${cartItems.length})` : ""}
        </Text>

        <TouchableOpacity onPress={onClose} className="p-2">
          <X size={20} color="black" />
        </TouchableOpacity>
      </View>

        {/* BODY */}
        <ScrollView className="flex-1 mt-3">
          {cartItems.length === 0 ? (
            <View className="items-center mt-20">
              <Text className="text-lg font-medium mb-2 text-gray-700">
                Giỏ hàng của bạn đang trống!
              </Text>
              <Text className="text-gray-500 mb-4">
                Hãy chọn món yêu thích và thêm vào giỏ hàng nhé 🍕
              </Text>

              <TouchableOpacity
                onPress={onClose}
                className="bg-orange-500 px-5 py-3 rounded-lg active:scale-95"
              >
                <Text className="text-white font-semibold text-base">
                  Tiếp tục mua sắm
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))
          )}
        </ScrollView>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <View className="border-t border-gray-200 pt-4">

            {/* Subtotal */}
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-700">Tạm tính</Text>
              <Text className="font-medium">{subtotal.toLocaleString()}₫</Text>
            </View>

            {/* Total */}
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-semibold text-lg">
                Tổng cộng: {total.toLocaleString()}₫
              </Text>

              <TouchableOpacity onPress={() => clearCart(false)}>
                <Text className="text-red-500 text-xs">Xóa tất cả</Text>
              </TouchableOpacity>
            </View>

            {/* THANH TOÁN */}
            <TouchableOpacity
              className="bg-orange-500 py-3 rounded-lg active:scale-95"
              onPress={() => {
                if (!currentUser) {
                  show("Bạn chưa đăng nhập 🔒\nVui lòng đăng nhập để tiếp tục thanh toán");

                  onClose();
                  router.push("/auth") as any;
                  return;
                }

                router.push({
                  pathname: "/checkout" as any,
                  params: { 
                    cartItems: JSON.stringify(cartItems),
                    subtotal: subtotal.toString(),
                    total: total.toString(),
                },
                });
              }}
            >
              <Text className="text-white text-center font-semibold text-base">
                Thanh Toán
              </Text>
            </TouchableOpacity>

          </View>
        )}
      </View>
    </Modal>
  );
}
