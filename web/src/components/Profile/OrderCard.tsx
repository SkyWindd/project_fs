"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";

import DroneMiniMap from "../../components/Location/DroneMiniMap";

import {
  type Order,
  type OrderDetail,
  type Payment,
  type Tracking,
  type Address,
  ORDER_STATUS_TEXT,
  ORDER_STATUS_COLOR,
  PAYMENT_STATUS_COLOR,
  PAYMENT_METHOD_TEXT,
} from "../../../constants/orderSystem";

import { mockMenuItems } from "../../../mock/mockData";
import { haversineDistance } from "../../lib/distance";

interface OrderCardProps {
  order: Order;
  address?: any;
  details: OrderDetail[];
  payment?: Payment;
  tracking?: Tracking;
}

export default function OrderCard({
  order,
  address,
  details,
  payment,
  tracking,
}: OrderCardProps) {
  const [openDetails, setOpenDetails] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + " ₫";

  // ---- Tính khoảng cách + ETA ----
  const distanceKm =
    tracking && address
      ? haversineDistance(
          tracking.latitude,
          tracking.longitude,
          address.latitude,
          address.longitude
        )
      : 0;

  const etaMinutes =
    tracking && distanceKm > 0
      ? Math.ceil((distanceKm / (tracking.speed || 40)) * 60)
      : 0;

  return (
    <>
      {/* CARD */}
      <Card className="border rounded-xl shadow-sm hover:shadow-md transition bg-white">
        <CardContent className="p-5 space-y-6">
          
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Mã đơn hàng</p>
              <p className="text-lg font-semibold text-gray-900">#{order.order_id}</p>
            </div>

            <Badge className={`${ORDER_STATUS_COLOR[order.status]} px-3 py-1 rounded-full`}>
              {ORDER_STATUS_TEXT[order.status]}
            </Badge>
          </div>

          <Separator />

          {/* ADDRESS */}
          <div className="bg-gray-50 p-3 rounded-lg border">
            <p className="text-sm text-gray-500">Giao đến</p>
            <p className="font-medium text-gray-800 mt-1">{address.address_label}</p>
            <p className="text-sm text-gray-600">{address.street}, {address.city}</p>
          </div>

          <Separator />

          {/* SUMMARY */}
          <div className="flex justify-between">
            <p className="font-semibold">Tổng cộng</p>
            <p className="text-lg font-bold text-red-600">
              {formatCurrency(order.total_amount)}
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

            {order.status === "delivering" && (
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

      {/* ============= MODAL CHI TIẾT ĐƠN HÀNG ============= */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
  <DialogContent  aria-describedby={undefined} className="max-w-md w-[92%] rounded-2xl p-5">
    <DialogHeader>
      <DialogTitle className="text-center text-lg font-bold">
        Chi tiết đơn hàng #{order.order_id}
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-5 mt-2">

      {/* PRODUCT LIST */}
      <div className="space-y-3">
        {details.map((d) => {
          const item = mockMenuItems.find((i) => i.item_id === d.item_id);

          return (
            <div
              key={d.order_detail_id}
              className="flex justify-between items-center text-sm"
            >
              <p className="text-gray-700">
                {item?.name}{" "}
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
        <div className="space-y-2 text-sm">
          <p>
            Phương thức:{" "}
            <span className="font-semibold">
              {PAYMENT_METHOD_TEXT[payment.payment_method]}
            </span>
          </p>

          <p className="flex items-center gap-2">
            Trạng thái:
            <Badge
              className={`${PAYMENT_STATUS_COLOR[payment.status]} px-2 py-0.5 text-xs`}
            >
              {payment.status === "success" && "Thành công"}
              {payment.status === "pending" && "Chờ xử lý"}
              {payment.status === "failed" && "Thất bại"}
              {payment.status === "refunded" && "Hoàn tiền"}
            </Badge>
          </p>
        </div>
      )}

      <Separator />

      {/* TOTAL */}
      <p className="text-right text-lg font-bold text-red-600">
        Tổng cộng: {formatCurrency(order.total_amount)}
      </p>
    </div>
  </DialogContent>
</Dialog>


    {/* ============= MODAL BẢN ĐỒ DRONE ============= */}
        <Dialog open={openMap} onOpenChange={setOpenMap}>
        <DialogContent  aria-describedby={undefined} className="max-w-md w-[95%] p-5 rounded-2xl">
            <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold">Theo dõi Drone</DialogTitle>
            </DialogHeader>

            {openMap && tracking && (
                <div className="space-y-4 mt-3">

                    <div className="bg-white border rounded-2xl shadow-sm p-3">
                    <div className="w-full h-[260px] md:h-[320px] rounded-xl overflow-hidden">
                        <DroneMiniMap
                        dronePos={{
                            lat: tracking.latitude,
                            lon: tracking.longitude,
                        }}
                        userPos={{
                            lat: address.latitude,
                            lon: address.longitude,
                        }}
                        />
                    </div>
                    </div>

                    <div className="flex items-start gap-2 px-1">
                    <span className="text-xl">📦</span>
                    <p className="text-sm text-gray-700 leading-5">
                        Drone cách bạn{" "}
                        <span className="font-semibold">{distanceKm.toFixed(2)} km</span>,  
                        ETA: <span className="font-semibold">{etaMinutes} phút</span>
                    </p>
                    </div>

                </div>
            )}

        </DialogContent>
        </Dialog>


    </>
  );
}
