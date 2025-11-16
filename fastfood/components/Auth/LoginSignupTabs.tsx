import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function LoginSignupTabs() {
  const params = useLocalSearchParams();

  // ⭐ FIX: Convert param tab về string chuẩn
  const rawTab = Array.isArray(params.tab) ? params.tab[0] : params.tab;

  const [tab, setTab] = useState<"login" | "signup">("login");

  // ⭐ FIX: Keep animated value stable
  const indicator = useRef(new Animated.Value(0)).current;

  // Khi URL đổi ?tab=signup → chạy
  useEffect(() => {
    if (rawTab === "signup") setTab("signup");
    if (rawTab === "login") setTab("login");
  }, [rawTab]);

  // Chạy animation
  useEffect(() => {
    Animated.timing(indicator, {
      toValue: tab === "login" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [tab]);

  const indicatorPosition = indicator.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  return (
    <View className="w-full px-6 mt-10">
      <View className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">

        {/* Tabs */}
        <View className="relative bg-gray-100 border border-gray-200 rounded-full flex-row p-1 mb-6">
          <Animated.View
            style={{
              position: "absolute",
              left: indicatorPosition,
              width: "50%",
              height: "100%",
              backgroundColor: "white",
              borderRadius: 999,
              paddingBottom: 37,
              elevation: 3,
            }}
          />

          <TouchableOpacity
            onPress={() => setTab("login")}
            className="flex-1 py-2 items-center z-10"
          >
            <Text className={tab === "login" ? "text-red-600 font-semibold" : "text-gray-600"}>
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTab("signup")}
            className="flex-1 py-2 items-center z-10"
          >
            <Text className={tab === "signup" ? "text-red-600 font-semibold" : "text-gray-600"}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
       <ScrollView 
            className="w-full" 
            showsVerticalScrollIndicator={false}            >
            {tab === "login" ? <LoginForm /> : <SignupForm />}
        </ScrollView>

      </View>
    </View>
  );
}
