import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { Plus } from "lucide-react-native";
import { useToast } from "../Toast/Toast";     
import ProductModal from "./ProductModal";
import { useLocationContext } from "../../context/LocationContext";

interface ProductCardProps {
  product: {
    item_id: number;
    name: string;
    image_url?: any;
    price: number;
    description?: string;
    category_id: number;
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const { fullAddress } = useLocationContext();
  const { show } = useToast();                 // ⭐ hook toast mới

  // Animation giống framer-motion
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      delay: index * 80,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 350,
      delay: index * 80,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOpenModal = () => {
    if (!fullAddress) {
      show("Vui lòng chọn địa chỉ giao hàng trước khi thêm món 🍕");
      return;
    }

    setOpen(true);
  };

  return (
    <>
      {/* Card Animation */}
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateY }] }}
        className="w-full p-2"
      >
        <View className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

          {/* Image */}
          <Image
            source={
              typeof product.image_url === "string"
                ? { uri: product.image_url }
                : product.image_url
            }
            className="w-full h-44 rounded-t-2xl"
            resizeMode="cover"
          />

          {/* Content */}
          <View className="p-4">
            <Text
              className="font-semibold text-gray-900 text-base mb-1"
              numberOfLines={1}
            >
              {product.name}
            </Text>

            <Text className="text-orange-600 font-bold text-sm">
              {product.price.toLocaleString()}₫
            </Text>

            {/* Add Button */}
            <View className="flex-row justify-end mt-4">
              <TouchableOpacity
                onPress={handleOpenModal}
                className="bg-orange-500 w-10 h-10 rounded-full items-center justify-center active:opacity-80 shadow"
              >
                <Plus size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Product Modal */}
      {open && (
        <ProductModal
          open={open}
          onClose={() => setOpen(false)}
          product={product}
        />
      )}
    </>
  );
}
