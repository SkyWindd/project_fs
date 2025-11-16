import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { useAuth } from "../../context/AuthContext";

import {
  mockOrders,
  mockOrderDetails,
  mockPayments,
  mockAddresses,
  mockTracking,
  mockMenuItems, // ⭐ MUST: thêm để truyền xuống OrderCard
} from "../../constants/mockData";

import OrderCard from "./OrderCard";

export default function ProfileOrders() {
  const { currentUser } = useAuth();

  if (!currentUser)
    return (
      <View className="py-4">
        <Text className="text-center text-gray-500">Bạn chưa đăng nhập.</Text>
      </View>
    );

  const parsedOrders = useMemo(() => {
    const orders = mockOrders.filter((o) => o.user_id === currentUser.user_id);

    return orders.map((order) => ({
      order,
      address: mockAddresses.find((a) => a.address_id === order.address_id),
      details: mockOrderDetails.filter((d) => d.order_id === order.order_id),
      payment: mockPayments.find((p) => p.order_id === order.order_id),
      tracking: mockTracking.find((t) => t.order_id === order.order_id),
      menuItems: mockMenuItems, // ⭐ TRUYỀN THÊM Ở ĐÂY
    }));
  }, [currentUser.user_id]);

  if (parsedOrders.length === 0)
    return (
      <View className="py-4">
        <Text className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</Text>
      </View>
    );

  const delivering = parsedOrders.filter((o) => o.order.status === "delivering");
  const history = parsedOrders.filter((o) => o.order.status !== "delivering");

  return (
    <ScrollView className="w-full px-4 pt-4" showsVerticalScrollIndicator={false}>
      
      {delivering.length > 0 && (
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-3">🚚 Đơn hàng đang giao</Text>
          <View className="space-y-4">
            {delivering.map((item) => (
              <OrderCard key={item.order.order_id} {...item} />
            ))}
          </View>
        </View>
      )}

      {history.length > 0 && (
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-3">📦 Lịch sử đơn hàng</Text>
          <View className="space-y-4">
            {history.map((item) => (
              <OrderCard key={item.order.order_id} {...item} />
            ))}
          </View>
        </View>
      )}

    </ScrollView>
  );
}
