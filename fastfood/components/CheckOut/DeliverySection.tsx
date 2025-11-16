import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MapPin, Edit3 } from "lucide-react-native";
import { useLocationContext } from "../../context/LocationContext";
import { useToast } from "../../components/Toast/Toast";

interface DeliveryProps {
  onChange?: (data: { address: string; note: string; time: string }) => void;
  openMapPicker: (cb: (addr: string, lat: number, lon: number) => void) => void;
}

export default function DeliverySection({ onChange, openMapPicker }: DeliveryProps) {
  const { fullAddress, setFullAddress, isAddressLoaded } = useLocationContext();
  const { show } = useToast();

  const [note, setNote] = useState("");
  const [time, setTime] = useState("now");

  useEffect(() => {
    onChange?.({ address: fullAddress ?? "", note, time });
  }, [fullAddress, note, time]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 16,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Giao đến
      </Text>

      {/* ĐỊA CHỈ */}
      <View style={{ marginBottom: 18 }}>
        <Text style={{ color: "#4b5563", marginBottom: 6 }}>
          Địa chỉ giao hàng
        </Text>

        {fullAddress ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              backgroundColor: "#f9fafb",
              borderWidth: 1,
              borderColor: "#e5e7eb",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <View style={{ flexDirection: "row", gap: 8, flex: 1 }}>
              <MapPin size={18} color="#ef4444" style={{ marginTop: 2 }} />

              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: "#111827",
                  fontWeight: "500",
                }}
              >
                {fullAddress}
              </Text>
            </View>

            {/* CHỈNH SỬA ĐỊA CHỈ → mở MapPicker */}
            <TouchableOpacity
              onPress={() =>
                openMapPicker((addr, lat, lon) => {
                  setFullAddress(addr); // cập nhật vào LocationContext
                })
              }
            >
              <Edit3 size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ fontSize: 13, color: "#9ca3af", fontStyle: "italic" }}>
            Không tìm thấy địa chỉ
          </Text>
        )}
      </View>

      {/* GHI CHÚ */}
      <View style={{ marginBottom: 4 }}>
        <Text style={{ color: "#4b5563", marginBottom: 6 }}>
          Ghi chú cho tài xế
        </Text>

        <TextInput
          placeholder="Ví dụ: để đồ trước cửa..."
          value={note}
          onChangeText={setNote}
          multiline
          style={{
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#d1d5db",
            backgroundColor: "#fafafa",
            minHeight: 80,
            textAlignVertical: "top",
            fontSize: 14,
          }}
        />
      </View>
    </View>
  );
}
