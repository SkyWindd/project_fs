import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";

export default function ProductModal({ open, onClose, product }: any) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [crust, setCrust] = useState("classic");
  const [note, setNote] = useState("");

  const sizePrice = size === "large" ? 30000 : size === "small" ? -20000 : 0;
  const crustPrice =
    crust === "cheese" ? 25000 : crust === "sausage" ? 25000 : 0;

  const totalPrice = (product.price + sizePrice + crustPrice) * quantity;

  const handleAdd = () => {
    addToCart({
      id: product.item_id,
      name: product.name,
      size: size,
      crust: crust,
      quantity,
      price: product.price + sizePrice + crustPrice,
      image_url: product.image_url,
      category_id: product.category_id,
      note,
    });
    onClose();
  };

  return (
    <Modal visible={open} animationType="fade" transparent>
      {/* LỚP MỜ NỀN */}
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        
        {/* MODAL CHÍNH GIỮA */}
        <View className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Close */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-4 top-4 bg-black/10 w-8 h-8 rounded-full items-center justify-center z-20"
          >
            <Feather name="x" size={22} color="#333" />
          </TouchableOpacity>

          {/* Nội dung */}
          <ScrollView
            className="max-h-[75vh]"
            showsVerticalScrollIndicator={false}
          >
            {/* Ảnh */}
            <Image
              source={
                typeof product.image_url === "string"
                  ? { uri: product.image_url }
                  : product.image_url
              }
              className="w-full h-56"
              resizeMode="cover"
            />

            <View className="p-6">
              {/* Tên */}
              <Text className="text-2xl font-bold text-gray-900">
                {product.name}
              </Text>

              <Text className="text-gray-600 text-sm mt-1">
                {product.description}
              </Text>

              <Text className="text-orange-500 font-bold text-xl mt-3">
                {product.price.toLocaleString()}₫
              </Text>

              {/* SIZE */}
              {product.category_id === 1 && (
                <View className="mt-6">
                  <Text className="text-sm font-semibold mb-2">
                    Kích thước
                  </Text>

                  <View className="flex-row gap-2">
                    {[
                      { key: "small", label: "Nhỏ", note: "-20k" },
                      { key: "medium", label: "Vừa", note: "Chuẩn" },
                      { key: "large", label: "Lớn", note: "+30k" },
                    ].map((opt) => (
                      <TouchableOpacity
                        key={opt.key}
                        onPress={() => setSize(opt.key as any)}
                        className={`flex-1 rounded-xl p-3 border items-center ${
                          size === opt.key
                            ? "bg-orange-500 border-orange-500"
                            : "border-gray-300"
                        }`}
                      >
                        <Text
                          className={`font-medium ${
                            size === opt.key ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {opt.label}
                        </Text>
                        <Text
                          className={`text-xs ${
                            size === opt.key ? "text-orange-50" : "text-gray-500"
                          }`}
                        >
                          {opt.note}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* CRUST */}
             {product.category_id === 1 && (
            <View className="mt-6">
                <Text className="text-sm font-semibold mb-3">Đế bánh</Text>

                <View className="space-y-3">
                {[
                    { id: "classic", label: "Đế truyền thống", extra: 0 },
                    { id: "cheese", label: "Viền phô mai", extra: 25000 },
                    { id: "sausage", label: "Viền xúc xích", extra: 25000 },
                ].map((op) => (
                    <TouchableOpacity
                    key={op.id}
                    onPress={() => setCrust(op.id)}
                    className={`p-4 mb-3 rounded-2xl flex-row justify-between items-center border shadow-sm
                        ${
                        crust === op.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 bg-white"
                        }`}
                    >
                    <View>
                        <Text className="text-gray-900 font-medium">{op.label}</Text>
                        {op.extra > 0 && (
                        <Text className="text-gray-500 text-xs mt-0.5">
                            +{op.extra.toLocaleString()}₫
                        </Text>
                        )}
                    </View>

                    {/* Dot indicator */}
                    <View
                        className={`w-5 h-5 rounded-full border-2 ${
                        crust === op.id
                            ? "border-orange-500 bg-orange-500"
                            : "border-gray-300 bg-white"
                        }`}
                    />
                    </TouchableOpacity>
                ))}
                </View>
            </View>
            )}


              {/* GHI CHÚ */}
              <View className="mt-6">
                <Text className="text-sm font-semibold mb-2">Ghi chú</Text>
                <TextInput
                  value={note}
                  onChangeText={setNote}
                  placeholder="Không hành, thêm phô mai..."
                  multiline
                  className="border border-gray-300 rounded-xl p-3 text-sm"
                />
              </View>

              <View className="h-6" />
            </View>
          </ScrollView>

          {/* FOOTER */}
          <View className="border-t border-gray-200 p-5">
            <View className="flex-row justify-center items-center gap-6 mb-4">
              <TouchableOpacity
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 justify-center items-center"
              >
                <AntDesign name="minus" size={20} color="#333" />
              </TouchableOpacity>

              <Text className="text-xl font-semibold">{quantity}</Text>

              <TouchableOpacity
                onPress={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 justify-center items-center"
              >
                <AntDesign name="plus" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleAdd}
              className="bg-orange-500 rounded-xl py-4"
            >
              <Text className="text-center text-white font-semibold text-base">
                Thêm vào giỏ hàng • {totalPrice.toLocaleString()}₫
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
