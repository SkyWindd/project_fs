"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import DroneMiniMap from "../../components/Location/DroneMiniMap";

interface OrderCardProps {
  order: any;
  details: any[];
  payment: any;
  tracking: any;
  items: any[];
}

export default function OrderCard({
  order,
  details,
  payment,
  tracking,
  items,
}: OrderCardProps) {
  const [openDetails, setOpenDetails] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const safeItems = Array.isArray(items) ? items : [];

  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + " ₫";

  // ============================
  // 📌 MÀU THEO TRẠNG THÁI ORDER
  // ============================
  const ORDER_STATUS_COLOR: Record<string, string> = {
    pending: "bg-gray-400 text-white",
    confirmed: "bg-blue-500 text-white",
    preparing: "bg-orange-500 text-white",
    delivering: "bg-yellow-500 text-white",
    completed: "bg-green-600 text-white",
    cancelled: "bg-red-600 text-white",
  };

  // ============================
  // 💳 PAYMENT STATUS COLOR
  // ============================
  const PAYMENT_STATUS_COLOR: Record<string, string> = {
    success: "text-green-600",
    pending: "text-orange-500",
    failed: "text-red-600",
    refunded: "text-blue-500",
  };

  // ============================
  // 📌 Tính khoảng cách Drone → User
  // ============================
  const calcDistance = () => {
    if (!tracking || !order.latitude || !order.longitude) return 0;

    const R = 6371; // km
    const dLat = ((order.latitude - tracking.latitude) * Math.PI) / 180;
    const dLon = ((order.longitude - tracking.longitude) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(tracking.latitude * Math.PI / 180) *
        Math.cos(order.latitude * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const distanceKm = calcDistance();
  const eta = tracking ? Math.ceil((distanceKm / (tracking.speed || 40)) * 60) : 0;

  return (
    <>
      <Card className="border rounded-xl shadow-sm hover:shadow-md transition bg-white">
        <CardContent className="p-5 space-y-6">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Mã đơn hàng</p>
              <p className="text-lg font-semibold text-gray-900">#{order.order_id}</p>
            </div>

            <Badge
              className={`px-3 py-1 rounded-full capitalize ${ORDER_STATUS_COLOR[order.status]}`}
            >
              {order.status}
            </Badge>
          </div>

          <Separator />

          {/* ADDRESS */}
          <div className="bg-gray-50 p-3 rounded-lg border">
            <p className="text-sm text-gray-500">Giao đến</p>
            <p className="font-medium text-gray-800 mt-1">{order.address}</p>

            <p className="text-xs text-gray-600 mt-1">
              (Lat: {order.latitude}, Lng: {order.longitude})
            </p>
          </div>

          <Separator />

          {/* TOTAL SUMMARY */}
          <div className="space-y-1 text-right">
            <p className="text-sm text-gray-500">Tổng tiền món ăn:</p>
            <p className="font-bold text-gray-800">
              {formatCurrency(order.total_amount)}
            </p>

            <p className="text-sm text-gray-500">Phí vận chuyển:</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(order.delivery_fee)}
            </p>

            {order.discount > 0 && (
              <>
                <p className="text-sm text-gray-500">Giảm giá:</p>
                <p className="font-semibold text-green-600">
                  -{formatCurrency(order.discount)}
                </p>
              </>
            )}

            <p className="text-lg font-bold text-red-600 mt-2">
              Tổng cộng:{" "}
              {formatCurrency(
                order.total_amount + order.delivery_fee - order.discount
              )}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button
              className="w-full sm:w-1/2 h-11 text-sm font-medium"
              variant="outline"
              onClick={() => setOpenDetails(true)}
            >
              Chi tiết đơn hàng
            </Button>

            {order.status === "delivering" && tracking && (
              <Button
                className="w-full sm:w-1/2 h-11 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setOpenMap(true)}
              >
                Theo dõi đơn hàng
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* MODAL CHI TIẾT ĐƠN */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="max-w-md rounded-2xl p-5" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Chi tiết đơn hàng #{order.order_id}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-3">

            {/* LIST PRODUCTS */}
            <div className="space-y-3">
              {details.map((d) => {
                const item = safeItems.find((i) => i.item_id === d.item_id);

                return (
                  <div key={d.order_detail_id} className="flex justify-between text-sm">
                    <p className="text-gray-700">
                      {item?.name || "Sản phẩm"}{" "}
                      <span className="text-gray-500">(x{d.quantity})</span>
                    </p>

                    <p className="font-semibold text-gray-900">
                      {formatCurrency(d.subtotal)}
                    </p>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* PAYMENT */}
            {payment && (
              <div className="text-sm space-y-1">
                <p>Phương thức: <b>{payment.payment_method}</b></p>
                <p className="flex items-center gap-2">
                  Trạng thái:
                  <span
                    className={`font-semibold ${PAYMENT_STATUS_COLOR[payment.status]}`}
                  >
                    {payment.status}
                  </span>
                </p>
              </div>
            )}

            <Separator />

            <p className="text-right text-lg font-bold text-red-600">
              Tổng cộng: {formatCurrency(order.total_amount)}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL MAP */}
      <Dialog open={openMap} onOpenChange={setOpenMap}>
        <DialogContent className="max-w-md w-[95%] rounded-2xl p-5">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Theo dõi Drone
            </DialogTitle>
          </DialogHeader>

          {tracking && (
            <div className="mt-4 space-y-4">
              <div className="w-full h-[260px] rounded-xl border overflow-hidden">
                <DroneMiniMap
                  dronePos={{ lat: tracking.latitude, lon: tracking.longitude }}
                  userPos={{ lat: order.latitude, lon: order.longitude }}
                />
              </div>

              <p className="text-sm text-gray-700 leading-6">
                Drone cách bạn{" "}
                <b>{distanceKm.toFixed(2)} km</b> — Dự kiến giao trong{" "}
                <b>{eta} phút</b>.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
