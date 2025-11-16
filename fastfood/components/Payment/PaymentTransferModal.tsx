import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Copy, CheckCircle2, Banknote } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import { useToast } from "../../components/Toast/Toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  totalAmount: number;
  customer: any;
}

export default function PaymentTransferModal({
  open,
  onClose,
  onSuccess,
  totalAmount,
  customer,
}: Props) {
  const { show } = useToast();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (open) {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setOrderId(`#DH${randomId}`);
    }
  }, [open]);

  const transferContent = `Thanh toan don hang ${orderId}`;

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    show("Đã sao chép vào clipboard!");
  };

  return (
    <Modal visible={open} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.45)",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {/* Modal box */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <View
            style={{
              backgroundColor: "#2563eb",
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Banknote size={22} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "700",
              }}
            >
              Thanh toán chuyển khoản
            </Text>
          </View>

          {/* BODY */}
          <View style={{ padding: 16 }}>
            {/* QR */}
            <View style={{ alignItems: "center", marginBottom: 12 }}>
              <Image
                source={require("../../assets/images/qr.jpg")}
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  marginTop: 6,
                }}
              >
                Quét mã bằng ứng dụng ngân hàng
              </Text>
            </View>

            {/* BANK INFO */}
            <View
              style={{
                backgroundColor: "#f9fafb",
                padding: 14,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                gap: 10,
              }}
            >
              {/* Bank */}
              <Row label="Ngân hàng" value="Techcombank" />

              {/* Account number */}
              <Row
                label="Số tài khoản"
                value="2107 6666 8888"
                copyValue="210766668888"
                onCopy={handleCopy}
              />

              {/* Owner */}
              <Row label="Chủ tài khoản" value="NGUYEN MINH QUAN" />

              {/* Amount */}
              <Row
                label="Số tiền"
                value={`${totalAmount.toLocaleString()}₫`}
                color="#1d4ed8"
              />

              {/* Content */}
              <Row
                label="Nội dung"
                value={transferContent}
                copyValue={transferContent}
                onCopy={handleCopy}
                multiline
              />
            </View>

            {/* WARNING */}
            <Text
              style={{
                backgroundColor: "#fef9c3",
                borderWidth: 1,
                borderColor: "#facc15",
                padding: 10,
                borderRadius: 10,
                marginTop: 12,
                fontSize: 12,
                color: "#854d0e",
              }}
            >
              ⚠️ Vui lòng chuyển khoản đúng số tiền và nội dung để hệ thống tự
              động xác nhận.
            </Text>

            {/* ACTION BUTTONS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 16,
                gap: 12,
              }}
            >
              <TouchableOpacity
                onPress={onClose}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  backgroundColor: "#f3f4f6",
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontWeight: "600", color: "#374151" }}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  onSuccess();
                  onClose();
                }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: "#2563eb",
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <CheckCircle2 size={18} color="white" />
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 15 }}
                >
                  Tôi đã chuyển tiền
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/* SMALL ROW COMPONENT */
function Row({
  label,
  value,
  copyValue,
  onCopy,
  color,
  multiline,
}: {
  label: string;
  value: string;
  color?: string;
  copyValue?: string;
  onCopy?: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Text style={{ width: 110, color: "#6b7280", fontWeight: "500" }}>
        {label}:
      </Text>

      <View style={{ flexDirection: "row", flex: 1 }}>
        <Text
          style={{
            flex: 1,
            color: color || "#111827",
            fontWeight: "600",
            flexWrap: "wrap",
          }}
        >
          {value}
        </Text>

        {onCopy && copyValue && (
          <TouchableOpacity onPress={() => onCopy(copyValue)}>
            <Copy size={16} color="#2563eb" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
