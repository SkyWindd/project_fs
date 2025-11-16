import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CheckCircle, XCircle } from "lucide-react-native";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  totalAmount: number;
}

export default function MomoModal({ open, onClose, onSuccess, totalAmount }: Props) {
  const [step, setStep] = useState<"loading" | "pay" | "success" | "failed">(
    "loading"
  );

  // Fake loading như Shopee
  useEffect(() => {
    if (open) {
      setStep("loading");
      setTimeout(() => setStep("pay"), 1500);
    }
  }, [open]);

  return (
    <Modal visible={open} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            Thanh toán MoMo
          </Text>

          {/* LOADING */}
          {step === "loading" && (
            <View style={{ alignItems: "center", paddingVertical: 20 }}>
              <ActivityIndicator size="large" color="#ec4899" />
              <Text style={{ marginTop: 10, color: "#6b7280" }}>
                Đang tạo yêu cầu thanh toán...
              </Text>
            </View>
          )}

          {/* PAY SCREEN */}
          {step === "pay" && (
            <View style={{ alignItems: "center", paddingVertical: 20 }}>
              {/* Logo Momo */}
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#ec4899",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: "white", fontSize: 26, fontWeight: "800" }}>
                  M
                </Text>
              </View>

              <Text style={{ color: "#374151", textAlign: "center" }}>
                Vui lòng xác nhận thanh toán trên ứng dụng MoMo
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#ec4899",
                }}
              >
                {totalAmount.toLocaleString()}₫
              </Text>

              <View style={{ marginTop: 20, width: "100%", gap: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#22c55e",
                    paddingVertical: 12,
                    borderRadius: 12,
                  }}
                  onPress={() => setStep("success")}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    Đã thanh toán
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#f3f4f6",
                    paddingVertical: 12,
                    borderRadius: 12,
                  }}
                  onPress={() => setStep("failed")}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      textAlign: "center",
                      color: "#374151",
                    }}
                  >
                    Thanh toán thất bại
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose}>
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 6,
                      color: "#6b7280",
                    }}
                  >
                    Hủy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* SUCCESS */}
         {step === "success" && (
  <View style={{ alignItems: "center", paddingVertical: 20 }}>
    <CheckCircle size={60} color="#22c55e" />

    <Text
      style={{
        fontSize: 18,
        fontWeight: "700",
        color: "#22c55e",
        marginTop: 10,
      }}
    >
      Thanh toán thành công!
    </Text>

    <Text
      style={{
        marginTop: 8,
        textAlign: "center",
        color: "#6b7280",
        paddingHorizontal: 20,
      }}
    >
      Bạn có thể theo dõi trạng thái đơn hàng trong mục{" "}
      <Text style={{ color: "#ef4444", fontWeight: "700" }}>
        Theo dõi đơn hàng
      </Text>{" "}
      ở phần tài khoản.
    </Text>

    <TouchableOpacity
      onPress={() => {
        onClose();
        onSuccess && onSuccess();
      }}
      style={{
        backgroundColor: "#ef4444",
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 22,
        width: "100%",
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Quay lại trang chủ
      </Text>
    </TouchableOpacity>
  </View>
)}

          {/* FAILED */}
          {step === "failed" && (
            <View style={{ alignItems: "center", paddingVertical: 20 }}>
              <XCircle size={60} color="#ef4444" />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#ef4444",
                  marginTop: 10,
                }}
              >
                Thanh toán thất bại!
              </Text>

              <TouchableOpacity
                onPress={onClose}
                style={{
                  backgroundColor: "#111827",
                  paddingVertical: 12,
                  borderRadius: 12,
                  marginTop: 20,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Thử lại sau
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
