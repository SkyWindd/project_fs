import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { useAuth } from "../../context/AuthContext";

interface CustomerSectionProps {
  onChange?: (data: { name: string; phone: string; email: string }) => void;
}

export default function CustomerSection({ onChange }: CustomerSectionProps) {
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // ⭐ Tự load thông tin user
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.full_name || "");
      setPhone(currentUser.phone_number || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  // ⭐ Gửi ra ngoài ngay khi cập nhật
  useEffect(() => {
    onChange?.({ name, phone, email });
  }, [name, phone, email]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Người đặt hàng
      </Text>

      {/* Họ tên */}
      <View style={{ marginBottom: 14 }}>
        <Text style={{ color: "#4b5563", marginBottom: 4 }}>Họ và tên</Text>

        <TextInput
          placeholder="Nhập họ và tên"
          value={name}
          onChangeText={setName}
          style={{
            padding: 12,
            borderRadius: 12,
            borderColor: "#d1d5db",
            borderWidth: 1,
            backgroundColor: "#f9fafb",
            fontSize: 15,
          }}
        />
      </View>

      {/* Số điện thoại */}
      <View style={{ marginBottom: 14 }}>
        <Text style={{ color: "#4b5563", marginBottom: 4 }}>Số điện thoại</Text>

        <TextInput
          placeholder="Nhập số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={{
            padding: 12,
            borderRadius: 12,
            borderColor: "#d1d5db",
            borderWidth: 1,
            backgroundColor: "#f9fafb",
            fontSize: 15,
          }}
        />
      </View>

      {/* Email */}
      <View style={{ marginBottom: 4 }}>
        <Text style={{ color: "#4b5563", marginBottom: 4 }}>Email</Text>

        <TextInput
          placeholder="Nhập email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{
            padding: 12,
            borderRadius: 12,
            borderColor: "#d1d5db",
            borderWidth: 1,
            backgroundColor: "#f9fafb",
            fontSize: 15,
          }}
        />
      </View>
    </View>
  );
}
