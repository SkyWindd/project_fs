import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { X, MapPin, List, Info } from "lucide-react-native";
import DroneMiniMap from "../Location/DroneMiniMap";

/* ========= TYPES ========= */
type Order = {
  order_id: number | string;
  user_id: number;
  total_amount: number;
  status: string;
  address_id?: number;
};

type OrderDetail = {
  order_detail_id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  subtotal: number;
};

type Payment = { order_id: number; payment_method: string; status: string };

type Tracking = {
  order_id: number;
  latitude: number;
  longitude: number;
  speed?: number; // km/h
};

type Address = {
  address_id: number;
  address_label?: string;
  street?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
};

/* ========= BADGE COLOR ========= */
const statusColors = {
  pending: { bg: "#FEF9C3", text: "#854D0E" },        // vàng nhạt
  confirmed: { bg: "#DBEAFE", text: "#1E40AF" },     // xanh dương nhạt
  preparing: { bg: "#E0F2FE", text: "#0369A1" },     // cyan nhạt
  delivering: { bg: "#DCFCE7", text: "#166534" },    // xanh lá nhạt
  completed: { bg: "#E2E8F0", text: "#475569" },     // xám nhạt
  canceled: { bg: "#FEE2E2", text: "#B91C1C" },      // đỏ nhạt
};

export default function OrderCard({
  order,
  address,
  details,
  payment,
  tracking,
  menuItems = [],
}: {
  order: Order;
  address?: Address;
  details: OrderDetail[];
  payment?: Payment;
  tracking?: Tracking;
  menuItems?: { item_id: number; name: string }[];
}) {
  const [openDetails, setOpenDetails] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const formatCurrency = (v: number) =>
    v.toLocaleString("vi-VN") + " ₫";

  /* ========= DISTANCE / ETA ========= */
  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const distanceKm = useMemo(() => {
    if (!tracking || !address || !tracking.latitude || !address.latitude)
      return 0;
    return haversineDistance(
      tracking.latitude,
      tracking.longitude,
      address.latitude ?? 0,
      address.longitude ?? 0
    );
  }, [tracking, address]);

  const etaMinutes = useMemo(() => {
    if (!tracking || distanceKm <= 0) return 0;
    const speed = tracking.speed && tracking.speed > 0 ? tracking.speed : 40;
    return Math.max(1, Math.ceil((distanceKm / speed) * 60));
  }, [tracking, distanceKm]);

  /* ========================================================= */

  /* Badge màu theo trạng thái */
  const statusStyle =
    statusColors[order.status as keyof typeof statusColors] ??
    statusColors["completed"];

  return (
    <>
      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.rowSpace}>
          <View>
            <Text style={styles.label}>Mã đơn</Text>
            <Text style={styles.orderId}>#{order.order_id}</Text>
          </View>

          <View
            style={[
              styles.badge,
              { backgroundColor: statusStyle.bg },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: statusStyle.text },
              ]}
            >
              {order.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.label}>Giao đến</Text>
          <Text style={styles.addressLabel}>
            {address?.address_label ?? "Địa chỉ khách hàng"}
          </Text>
          <Text style={styles.addressText}>
            {address?.street ?? "-"}, {address?.city ?? "-"}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* TOTAL */}
        <View style={styles.rowSpace}>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(order.total_amount)}
          </Text>
        </View>

        <View style={{ height: 14 }} />

        {/* BUTTONS */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnOutline]}
            onPress={() => setOpenDetails(true)}
          >
            <List size={16} color="#374151" />
            <Text style={styles.btnOutlineText}>Chi tiết</Text>
          </TouchableOpacity>

          {order.status === "delivering" && (
            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => setOpenMap(true)}
            >
              <Info size={16} color="#fff" />
              <Text style={styles.btnPrimaryText}>Theo dõi</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* =================== MODAL CHI TIẾT ĐƠN =================== */}
      <Modal visible={openDetails} animationType="fade" transparent>
        <Pressable
          style={styles.overlay}
          onPress={() => setOpenDetails(false)}
        />

        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Chi tiết đơn #{order.order_id}
            </Text>
            <TouchableOpacity onPress={() => setOpenDetails(false)}>
              <X size={22} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: 420 }}>
            {details.map((d) => {
              const item = menuItems.find(
                (m) => Number(m.item_id) === Number(d.item_id)
              );

              return (
                <View key={d.order_detail_id} style={styles.detailRow}>
                  <Text style={styles.detailName}>
                    {item?.name || "Không tìm thấy sản phẩm"}{" "}
                    <Text style={styles.detailQty}>x{d.quantity}</Text>
                  </Text>

                  <Text style={styles.detailPrice}>
                    {formatCurrency(d.subtotal)}
                  </Text>
                </View>
              );
            })}

            {payment && (
              <View style={styles.paymentBox}>
                <Text style={styles.paymentText}>
                  Phương thức:{" "}
                  <Text style={styles.bold}>{payment.payment_method}</Text>
                </Text>
                <Text style={styles.paymentText}>
                  Trạng thái:{" "}
                  <Text style={styles.bold}>{payment.status}</Text>
                </Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalRight}>Tổng cộng</Text>
              <Text style={styles.totalRightVal}>
                {formatCurrency(order.total_amount)}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* =================== MODAL TRACKING =================== */}
      <Modal visible={openMap} animationType="slide" transparent>
        <Pressable style={styles.overlay} onPress={() => setOpenMap(false)} />

        <View style={[styles.modal, { paddingBottom: 20 }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Theo dõi đơn #{order.order_id}
            </Text>
            <TouchableOpacity onPress={() => setOpenMap(false)}>
              <X size={22} color="#666" />
            </TouchableOpacity>
          </View>

          {tracking && address ? (
            <>
              <DroneMiniMap
                dronePos={{
                  lat: tracking.latitude,
                  lon: tracking.longitude,
                }}
                userPos={{
                  lat: address.latitude ?? 0,
                  lon: address.longitude ?? 0,
                }}
              />

              <Text style={styles.trackingText}>
                Drone cách bạn{" "}
                <Text style={styles.bold}>{distanceKm.toFixed(2)} km</Text>
                {"  "}— ETA:{" "}
                <Text style={styles.bold}>{etaMinutes} phút</Text>
              </Text>
            </>
          ) : (
            <Text style={{ padding: 10 }}>Chưa có dữ liệu theo dõi.</Text>
          )}
        </View>
      </Modal>
    </>
  );
}

/* ========= STYLES ========= */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  label: { fontSize: 12, color: "#6b7280" },
  orderId: { fontSize: 16, fontWeight: "700", color: "#111827" },

  divider: { height: 14 },

  addressLabel: {
    fontWeight: "600",
    color: "#111827",
    marginTop: 4,
  },
  addressText: {
    color: "#6b7280",
    marginTop: 2,
  },

  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontWeight: "600",
    fontSize: 12,
    textTransform: "capitalize",
  },

  totalLabel: { fontWeight: "600", fontSize: 14 },
  totalValue: {
    color: "#ef4444",
    fontWeight: "800",
    fontSize: 18,
  },

  buttonsRow: {
    flexDirection: "row",
    gap: 10,
  },

  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  btnOutlineText: {
    color: "#1f2937",
    fontWeight: "600",
  },
  btnPrimary: {
    backgroundColor: "#0ea5a4",
  },
  btnPrimaryText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* MODAL */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modal: {
    position: "absolute",
    left: 20,
    right: 20,
    top: "12%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    maxHeight: "78%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#f3f4f6",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#f1f5f9",
    borderBottomWidth: 1,
  },
  detailName: { fontSize: 15, color: "#111" },
  detailQty: { color: "#6b7280" },
  detailPrice: { fontWeight: "700", color: "#111827" },

  paymentBox: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 12,
    marginTop: 12,
  },
  paymentText: { color: "#444", marginBottom: 4 },
  bold: { fontWeight: "700" },

  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  totalRight: { color: "#374151", marginRight: 12, fontWeight: "600" },
  totalRightVal: { color: "#ef4444", fontWeight: "800" },

  trackingText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
    color: "#444",
  },
});
