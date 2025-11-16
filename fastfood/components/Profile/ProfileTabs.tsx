import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ProfileInfo from "./ProfileInfo";
import ProfileOrders from "./ProfileOrders";

export default function ProfileTabs() {
  const params = useLocalSearchParams();

  const rawTab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  const [tab, setTab] = useState<"info" | "orders">("info");

  // Giữ animation stable
  const indicator = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (rawTab === "orders") setTab("orders");
    if (rawTab === "info") setTab("info");
  }, [rawTab]);

  // Animate indicator
  useEffect(() => {
    Animated.timing(indicator, {
      toValue: tab === "info" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [tab]);

  const indicatorPosition = indicator.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  return (
    <View className="w-full mt-6">
      {/* Card */}
      <View className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md">

        {/* Tabs header */}
        <View className="relative flex-row p-1 rounded-full bg-gray-100 border border-gray-200">
          {/* Moving indicator */}
          <Animated.View
            style={{
              position: "absolute",
              left: indicatorPosition,
              width: "50%",
              height: "100%",
              paddingBottom: 37,
              backgroundColor: "white",
              borderRadius: 999,
              elevation: 4,
            }}
          />

          <TouchableOpacity
            onPress={() => setTab("info")}
            className="flex-1 items-center py-2 z-10"
          >
            <Text
              className={`${
                tab === "info" ? "text-red-600 font-semibold" : "text-gray-600"
              }`}
            >
              Thông tin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTab("orders")}
            className="flex-1 items-center py-2 z-10"
          >
            <Text
              className={`${
                tab === "orders" ? "text-red-600 font-semibold" : "text-gray-600"
              }`}
            >
              Đơn hàng
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab content */}
        <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
          {tab === "info" ? <ProfileInfo /> : <ProfileOrders />}
        </ScrollView>

      </View>
    </View>
  );
}
