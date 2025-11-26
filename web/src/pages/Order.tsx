import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import OrderCard from "../components/Orders/OrderCard";
import { mockOrders } from "../../mock/mockData";
import type { Order } from "../../mock/mockData";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "delivering" | "completed" | "cancelled"
  >("all");
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_id.toString().includes(search) ||
      order.drone_id.toString().includes(search);
    const matchesFilter = filter === "all" || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleOrderStatus = (orderId: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.order_id === orderId
          ? {
              ...order,
              status:
                order.status === "delivering"
                  ? "completed"
                  : order.status === "completed"
                  ? "delivering"
                  : order.status,
              updated_at: new Date().toISOString(),
            }
          : order
      )
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">📦 Danh sách đơn hàng</h2>

      {/* Bộ lọc & tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "Tất cả" },
            { key: "pending", label: "Chờ xác nhận" },
            { key: "confirmed", label: "Đã xác nhận" },
            { key: "delivering", label: "Đang giao" },
            { key: "completed", label: "Hoàn tất" },
            { key: "cancelled", label: "Đã hủy" },
          ].map((btn) => (
            <Button
              key={btn.key}
              variant={filter === btn.key ? "default" : "outline"}
              onClick={() => setFilter(btn.key as any)}
              className="text-sm"
            >
              {btn.label}
            </Button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm theo mã đơn hoặc Drone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Danh sách đơn */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.order_id}
              order={order}
              onToggleStatus={() => toggleOrderStatus(order.order_id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            Không có đơn hàng nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
