import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import DronePicker from "./DronePicker";   // ⭐ tạo mới modal chọn drone

interface Props {
  order: any;               
  onStatusChange: (status: string) => void;
  onAssignDrone: (droneId: string) => void;
}

export default function OrderCard({ order, onStatusChange, onAssignDrone }: Props) {

  const [openDronePicker, setOpenDronePicker] = useState(false);

  /* ============================
      STATUS LABEL
  ============================ */
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Chờ xác nhận";
      case "confirmed": return "Đã xác nhận";
      case "delivering": return "Đang giao";
      case "completed": return "Hoàn tất";
      case "cancelled": return "Đã hủy";
      default: return "Không rõ";
    }
  };

  const nextStatus = {
    pending: "confirmed",
    confirmed: "delivering",
    delivering: "completed",
    completed: "pending",
  } as any;

  /* ============================
      DATE FORMAT SAFE
  ============================ */
  const formatDate = (value?: string) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "—";
    return format(d, "HH:mm dd/MM/yyyy", { locale: vi });
  };

  return (
    <>
      <Card className="hover:shadow-md transition-all border border-gray-100 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Đơn hàng #{order.order_id}
          </CardTitle>

          <Badge className="px-3 py-1 rounded-full text-xs font-medium">
            {getStatusLabel(order.status)}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-gray-700">

          <div className="grid grid-cols-2 gap-y-1">
            <p><span className="font-medium">Khách:</span> #{order.user_id}</p>
            <p><span className="font-medium">Cửa hàng:</span> #{order.store_id}</p>

            <p className="col-span-2">
              <span className="font-medium">Địa chỉ:</span> {order.address}
            </p>

            <p>
              <span className="font-medium">Tổng tiền:</span>{" "}
              {order.total_amount?.toLocaleString("vi-VN")}₫
            </p>
            <p>
              <span className="font-medium">Phí giao:</span>{" "}
              {order.delivery_fee?.toLocaleString("vi-VN")}₫
            </p>
          </div>

          <div className="border-t pt-2 text-xs text-gray-600 space-y-1">
            <p>🕒 <b>Tạo:</b> {formatDate(order.created_at)}</p>
            <p>✏️ <b>Cập nhật:</b> {formatDate(order.updated_at)}</p>
            {order.drone_id && (
              <p>🚁 <b>Drone:</b> #{order.drone_id}</p>
            )}
          </div>

          <div className="pt-3 space-y-2">
            {/* Cập nhật trạng thái */}
            <Button
              size="sm"
              className="w-full"
              variant="default"
              onClick={() => onStatusChange(nextStatus[order.status] ?? "pending")}
            >
              🔄 Đổi trạng thái → {getStatusLabel(nextStatus[order.status])}
            </Button>

            {/* Gán drone */}
            <Button
              size="sm"
              variant="secondary"
              className="w-full"
              onClick={() => setOpenDronePicker(true)}
            >
              🚁 Chọn drone giao hàng
            </Button>
          </div>

        </CardContent>
      </Card>

      {/* MODAL CHỌN DRONE */}
      <DronePicker
        open={openDronePicker}
        onClose={() => setOpenDronePicker(false)}
        onSelect={onAssignDrone}
      />
    </>
  );
}
