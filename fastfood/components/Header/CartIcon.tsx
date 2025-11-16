import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ShoppingCart } from "lucide-react-native";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../../components/Cart/CartDrawer";

export default function CartIcon() {
  const [open, setOpen] = useState(false);
  const { cartItems } = useCart();

  // Tổng số lượng
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View>
      <Pressable
        onPress={() => setOpen(true)}
        className="relative p-2 active:scale-95"
      >
        <ShoppingCart size={24} color="#444" />

        {/* Badge */}
        <View
          className={`absolute -top-1 -right-1 px-1.5 rounded-full ${
            count > 0 ? "bg-red-500" : "bg-gray-400"
          }`}
        >
          <Text className="text-white text-xs font-semibold">{count}</Text>
        </View>
      </Pressable>

      {/* Drawer giỏ hàng */}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </View>
  );
}
