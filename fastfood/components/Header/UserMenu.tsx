import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  User,
  LogIn,
  UserPlus,
  Package,
  LogOut,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function UserMenu() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);

  /** -------------------------------
   * 🔹 Điều hướng đến Login / Signup
   * ------------------------------ */
  const handleNavigate = (tab: "login" | "signup") => {
  setOpen(false);
  router.push({
    pathname: "/auth" as any,
    params: { tab },
  });
};

const handleProfile = (tab: "info" | "orders") => {
  setOpen(false);
  router.push({
    pathname: "/profile" as any,
    params: { tab },
  });
};


{/*const handleOrders = () => {
  setOpen(false);
  router.push("/orders");
};*/}

  return (
    <View>
      {/* --- ICON USER / AVATAR --- */}
      <Pressable
        onPress={() => setOpen(true)}
        className="rounded-full border p-2 bg-white active:opacity-70"
      >
        {currentUser ? (
          <Text className="w-7 h-7 rounded-full bg-red-600 text-white text-sm font-semibold text-center pt-1">
            {currentUser.full_name?.charAt(0).toUpperCase() ?? "U"}
          </Text>
        ) : (
          <User size={22} color="#444" />
        )}
      </Pressable>

      {/* --- MENU DROPDOWN --- */}
      <Modal transparent visible={open} animationType="fade">
        {/* Overlay để click ra ngoài tắt menu */}
        <Pressable
          className="flex-1 bg-black/30"
          onPress={() => setOpen(false)}
        />

        {/* Dropdown card */}
        <View className="absolute right-4 top-16 w-64 bg-white rounded-2xl shadow-xl p-2">

          {/* Nếu CHƯA đăng nhập */}
          {!currentUser ? (
            <>
              <TouchableOpacity
                onPress={() => handleNavigate("login")}
                className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-gray-100"
              >
                <LogIn size={20} color="#555" />
                <Text className="text-gray-700 text-base">Đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleNavigate("signup")}
                className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-gray-100"
              >
                <UserPlus size={20} color="#555" />
                <Text className="text-gray-700 text-base">Đăng ký</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* User Info */}
              <View className="px-4 py-3 border-b border-gray-200">
                <Text className="text-sm font-semibold text-gray-900">
                  {currentUser.full_name}
                </Text>
                <Text className="text-xs text-gray-500">
                  {currentUser.email}
                </Text>
              </View>

              {/* Profile */}
              <TouchableOpacity
                onPress={() => handleProfile("info")}
                className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-gray-100"
              >
                <User size={20} color="#555" />
                <Text className="text-gray-700">Thông tin tài khoản</Text>
              </TouchableOpacity>

              {/* Orders */}
              <TouchableOpacity
                onPress={() => handleProfile("orders")}
                className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-gray-100"
              >
                <Package size={20} color="#555" />
                <Text className="text-gray-700">Theo dõi đơn hàng</Text>
              </TouchableOpacity>

              {/* Logout */}
              <TouchableOpacity
                onPress={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-gray-100"
              >
                <LogOut size={20} color="#e11d48" />
                <Text className="text-gray-700">Đăng xuất</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}
