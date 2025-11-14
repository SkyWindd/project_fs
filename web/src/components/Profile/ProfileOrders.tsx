"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";

import {
  mockOrders,
  mockOrderDetails,
  mockPayments,
  mockAddresses,
  mockTracking,
} from "../../../mock/mockData";

import OrderCard from "./OrderCard";

export default function ProfileOrders() {
  const { currentUser } = useAuth();
  if (!currentUser)
    return <p className="text-center text-gray-500 py-4">Bạn chưa đăng nhập.</p>;

  const orders = mockOrders.filter((o) => o.user_id === currentUser.user_id);

  if (orders.length === 0)
    return <p className="text-center text-gray-500 py-4">Bạn chưa có đơn hàng nào.</p>;

  // Chia đơn hàng
  const deliveringOrders = orders.filter((o) => o.status === "delivering");
  const otherOrders = orders.filter((o) => o.status !== "delivering");

  return (
    <div className="space-y-10">

      {/* ===== ĐƠN HÀNG ĐANG GIAO ===== */}
      {deliveringOrders.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            🚚 Đơn hàng đang giao
          </h2>

          <div className="space-y-6">
            {deliveringOrders.map((order) => {
              const address = mockAddresses.find(a => a.address_id === order.address_id);
              const details = mockOrderDetails.filter(d => d.order_id === order.order_id);
              const payment = mockPayments.find(p => p.order_id === order.order_id);
              const tracking = mockTracking.find(t => t.order_id === order.order_id);

              return (
                <OrderCard
                  key={order.order_id}
                  order={order}
                  address={address}
                  details={details}
                  payment={payment}
                  tracking={tracking}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* ===== LỊCH SỬ ĐƠN HÀNG ===== */}
      {otherOrders.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            📦 Lịch sử đơn hàng
          </h2>

          <div className="space-y-6">
            {otherOrders.map((order) => {
              const address = mockAddresses.find(a => a.address_id === order.address_id);
              const details = mockOrderDetails.filter(d => d.order_id === order.order_id);
              const payment = mockPayments.find(p => p.order_id === order.order_id);
              const tracking = mockTracking.find(t => t.order_id === order.order_id);

              return (
                <OrderCard
                  key={order.order_id}
                  order={order}
                  address={address}
                  details={details}
                  payment={payment}
                  tracking={tracking}
                />
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
