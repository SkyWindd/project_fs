import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SmartphoneNfc, CreditCard, Wallet } from "lucide-react-native";

interface Props {
  onChange?: (method: string) => void;
  methods?: string[]; // optional override
}

const iconMap: Record<string, any> = {
  momo: SmartphoneNfc,
  banking: CreditCard,
  vnpay: Wallet,
};

const labelMap: Record<string, string> = {
  momo: "Thanh toán MoMo",
  banking: "Chuyển khoản ngân hàng",
  vnpay: "VNPay",
};

export default function PaymentSection({
  onChange,
  methods = ["momo", "banking"],
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (method: string) => {
    setSelected(method);
    onChange?.(method);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 20,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Phương thức thanh toán
      </Text>

      <View style={{ gap: 12 }}>
        {methods.map((method) => {
          const Icon = iconMap[method] ?? Wallet;
          const active = selected === method;

          return (
            <TouchableOpacity
              key={method}
              onPress={() => handleSelect(method)}
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: active ? "#ef4444" : "#d1d5db",
                backgroundColor: active ? "#fef2f2" : "#fff",
              }}
            >
              {/* Icon */}
              <View
                style={{
                  padding: 10,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: active ? "#ef4444" : "#d1d5db",
                  backgroundColor: active ? "#ef4444" : "#fff",
                  marginRight: 12,
                }}
              >
                <Icon
                  size={20}
                  color={active ? "#fff" : "#6b7280"}
                />
              </View>

              {/* Label */}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: active ? "#dc2626" : "#374151",
                }}
              >
                {labelMap[method] ?? method}
              </Text>

              {/* Right mark */}
              {active && (
                <Text style={{ marginLeft: "auto", color: "#dc2626", fontWeight: "700" }}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
