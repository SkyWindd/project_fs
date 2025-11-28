import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { Order } from "../../../mock/mockData";

interface Props {
  order: Order;
  onToggleStatus: () => void;
}

export default function OrderCard({ order, onToggleStatus }: Props) {
  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "delivering":
        return "Đang giao";
      case "completed":
        return "Hoàn tất";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Khác";
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "delivering":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) =>
    format(new Date(dateString), "HH:mm dd/MM/yyyy", { locale: vi });

  return (
    <Card className="hover:shadow-md transition-all duration-200 border border-gray-100 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Đơn hàng #{order.order_id}
        </CardTitle>
        <Badge
          className={`${getStatusColor(
            order.status
          )} px-3 py-1 rounded-full text-xs font-medium`}
        >
          {getStatusLabel(order.status)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-gray-700">
        <div className="grid grid-cols-2 gap-y-1">
          <p>
            <span className="font-medium">Khách hàng:</span> #{order.customer_id}
          </p>
          <p>
            <span className="font-medium">Địa chỉ:</span> #{order.address_id}
          </p>
          <p>
            <span className="font-medium">Drone phụ trách:</span> #{order.drone_id}
          </p>
          <p>
            <span className="font-medium">Tổng tiền:</span>{" "}
            {order.total_amount.toLocaleString("vi-VN")}₫
          </p>
          <p>
            <span className="font-medium">Phí giao:</span>{" "}
            {order.delivery_fee.toLocaleString("vi-VN")}₫
          </p>
          <p>
            <span className="font-medium">Giảm giá:</span>{" "}
            {order.discount.toLocaleString("vi-VN")}₫
          </p>
        </div>

        <div className="pt-2 text-xs border-t border-gray-100 text-gray-600 leading-relaxed">
          <p>
            🕒 <span className="font-medium text-gray-800">Giao:</span>{" "}
            {formatDate(order.assigned_time)}
          </p>
          <p>
            📅 <span className="font-medium text-gray-800">Tạo:</span>{" "}
            {formatDate(order.created_at)}
          </p>
          <p>
            ✏️ <span className="font-medium text-gray-800">Cập nhật:</span>{" "}
            {formatDate(order.updated_at)}
          </p>
        </div>

        <div className="pt-3">
          <Button
            size="sm"
            className="w-full"
            variant={
              order.status === "delivering"
                ? "default"
                : order.status === "completed"
                ? "secondary"
                : "outline"
            }
            onClick={onToggleStatus}
          >
            {order.status === "delivering"
              ? "✅ Hoàn tất đơn"
              : order.status === "completed"
              ? "🚚 Giao lại"
              : "🔄 Cập nhật"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
