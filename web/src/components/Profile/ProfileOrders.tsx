"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchOrdersByUser } from "../../lib/api";
import OrderCard from "./OrderCard";

export default function ProfileOrders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    fetchOrdersByUser(currentUser.user_id)
      .then((data) => setOrders(data)) // data = [{ order, address, details, payment, tracking, items }]
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [currentUser]);

  /* ======================
        UI STATES
  ====================== */
  if (!currentUser)
    return (
      <p className="text-center text-gray-500 py-4">
        Bạn chưa đăng nhập.
      </p>
    );

  if (loading)
    return (
      <p className="text-center text-gray-500 py-4">
        Đang tải đơn hàng...
      </p>
    );

  if (orders.length === 0)
    return (
      <p className="text-center text-gray-500 py-4">
        Bạn chưa có đơn hàng nào.
      </p>
    );

  /* ======================
       PHÂN LOẠI ĐƠN HÀNG
  ====================== */

  // ⭐ Đơn đang giao (status = delivering)
  const delivering = orders.filter(
    (o) => o.order.status === "delivering"
  );

  // ⭐ Lịch sử đơn hàng (không phải delivering)
  const history = orders.filter(
    (o) => o.order.status !== "delivering"
  );

  return (
    <div className="space-y-10">

      {/* ===================
          ĐƠN ĐANG GIAO
      ==================== */}
      {delivering.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            🚚 Đơn hàng đang giao
          </h2>

          <div className="space-y-6">
            {delivering.map((o) => (
              <OrderCard
                order={o.order}
                details={o.details}
                payment={o.payment}
                tracking={o.tracking}
                items={o.items}
              />
            ))}
          </div>
        </section>
      )}

      {/* ===================
          LỊCH SỬ ĐƠN HÀNG
      ==================== */}
      {history.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            📦 Lịch sử đơn hàng
          </h2>

          <div className="space-y-6">
            {history.map((o) => (
              <OrderCard
                order={o.order}
                details={o.details}
                payment={o.payment}
                tracking={o.tracking}
                items={o.items}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
