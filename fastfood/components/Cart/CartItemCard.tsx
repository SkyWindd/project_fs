import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import { X, Plus, Minus, Trash2 } from "lucide-react-native";
import { useCart } from "../../context/CartContext";

export default function CartItemCard({ item }: { item: any }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [showDelete, setShowDelete] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;

  /** Swipe trái */
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 5,

    onPanResponderMove: (_, g) => {
      if (g.dx < 0) translateX.setValue(g.dx);
    },

    onPanResponderRelease: (_, g) => {
      if (g.dx < -60) {
        setShowDelete(true);
        Animated.timing(translateX, {
          toValue: -90,
          duration: 180,
          useNativeDriver: true,
        }).start();
      } else {
        setShowDelete(false);
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleDelete = () => {
    Animated.timing(translateX, {
      toValue: -300,
      duration: 160,
      useNativeDriver: true,
    }).start(() => removeFromCart(item.id));
  };

  /** --------------------------
   * 🔥 FIX LỖI HÌNH
   * Nếu không phải string → dùng require placeholder
   * -------------------------- */
  const getImageSource = () => {
    if (typeof item.image_url === "string") {
      return { uri: item.image_url };
    }
    return item.image_url ?? require("../../assets/images/placeholder.png");
  };

  return (
    <View className="relative my-2">

      {/* Nút Xóa */}
      {showDelete && (
        <View className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-red-600 px-4 py-2 rounded-lg flex-row items-center gap-1 active:scale-95 shadow-md"
          >
            <Trash2 size={14} color="white" />
            <Text className="text-white text-xs font-medium">Xóa</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Card */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateX }] }}
        className="flex-row items-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        {/* Ảnh món */}
        <Image
          source={getImageSource()}
          className="w-16 h-16 rounded-xl bg-gray-100"
          resizeMode="cover"
        />

        {/* Nội dung */}
        <View className="flex-1 ml-3">

          {/* tên + giá */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-3">
              <Text className="font-semibold text-sm text-gray-900" numberOfLines={2}>
                {item.name}
              </Text>

              {item.category_id === 1 && (
                <Text className="text-xs text-gray-500 mt-1">
                  Cỡ: {item.size} • Đế: {item.crust}
                </Text>
              )}
            </View>

            {/* Giá + nút X */}
            <View className="items-end">
              <TouchableOpacity onPress={handleDelete}>
                <X size={16} color="gray" />
              </TouchableOpacity>

              <Text className="text-sm font-semibold text-gray-900 mt-1">
                {(item.price * item.quantity).toLocaleString()}₫
              </Text>
            </View>
          </View>

          {/* tăng/giảm số lượng */}
          <View className="flex-row items-center gap-3 mt-3">

            {/* Giảm */}
            <TouchableOpacity
              onPress={() =>
                updateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              className="h-7 w-7 rounded-full border border-gray-300 bg-white items-center justify-center active:scale-95"
            >
              <Minus size={14} color="#444" />
            </TouchableOpacity>

            <Text className="text-sm font-semibold text-gray-800 w-6 text-center">
              {item.quantity}
            </Text>

            {/* Tăng */}
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              className="h-7 w-7 rounded-full border border-gray-300 bg-white items-center justify-center active:scale-95"
            >
              <Plus size={14} color="#444" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
