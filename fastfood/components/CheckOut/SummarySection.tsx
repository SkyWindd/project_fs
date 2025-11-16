import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  crust?: string;
  category_id?: number;
  image_url?: string;
}

interface Props {
  cartItems: CartItem[];
  subtotal: number;
  total: number;
  onOrder: (total: number) => void;
}

export default function SummarySection({
  cartItems,
  subtotal,
  total,
  onOrder,
}: Props) {
  return (
    <View style={{ marginTop: 20 }}>
      {/* CARD GIỎ HÀNG */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 18,
          padding: 16,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#111827",
            marginBottom: 12,
          }}
        >
          Giỏ hàng của tôi
        </Text>

        <Text style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
          Có {cartItems.length} sản phẩm trong giỏ hàng
        </Text>

        {/* LIST SP */}
        <View>
          {cartItems.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: "#f1f5f9",
              }}
            >
              {/* LEFT: IMAGE + INFO */}
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ maxWidth: 170 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#111827",
                    }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  {item.category_id === 1 && (
                    <Text style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
                      Cỡ: {item.size} • Đế: {item.crust}
                    </Text>
                  )}

                  <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                    x{item.quantity}
                  </Text>
                </View>
              </View>

              {/* RIGHT: PRICE */}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {(item.price * item.quantity).toLocaleString()}₫
              </Text>
            </View>
          ))}
        </View>

        {/* TỔNG KẾT */}
        <View
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: 14,
            padding: 14,
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#e2e8f0",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 14, color: "#6b7280" }}>Tạm tính</Text>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              {subtotal.toLocaleString()}₫
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <Text style={{ fontSize: 14, color: "#6b7280" }}>Phí giao hàng</Text>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>0₫</Text>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: "#e2e8f0",
              marginVertical: 10,
            }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 17, fontWeight: "700", color: "#111827" }}>
              Tổng cộng
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: "#ef4444",
              }}
            >
              {total.toLocaleString()}₫
            </Text>
          </View>
        </View>
      </View>

      {/* CARD ĐẶT HÀNG */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 18,
          padding: 16,
          borderWidth: 1,
          borderColor: "#e5e7eb",
        }}
      >
        {/* Checkbox "đồng ý" */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <Switch value={true} />
          <Text style={{ marginLeft: 10, fontSize: 14, color: "#374151" }}>
            Tôi đồng ý với điều khoản của cửa hàng
          </Text>
        </View>

        {/* Nút đặt hàng */}
        <TouchableOpacity
          onPress={() => onOrder(total)}
          style={{
            backgroundColor: "#ef4444",
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
          }}
          activeOpacity={0.85}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              fontWeight: "700",
            }}
          >
            Đặt hàng ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
