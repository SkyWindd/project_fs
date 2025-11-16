import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Pencil } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import AddressList from "./AddressList";
import EditProfileModal from "./EditProfileDialog";

export default function ProfileInfo() {
  const { currentUser } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);

  if (!currentUser) {
    return (
      <View className="py-8">
        <Text className="text-center text-gray-500">Bạn chưa đăng nhập.</Text>
      </View>
    );
  }

  return (
    <View className="space-y-6">

      {/* ================================== */}
      {/* CARD: THÔNG TIN NGƯỜI DÙNG */}
      {/* ================================== */}
      <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">

        {/* HEADER */}
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-xl font-semibold text-gray-900">
            Thông tin tài khoản
          </Text>

          <TouchableOpacity
            onPress={() => setOpenEdit(true)}
            className="flex-row items-center gap-1 px-3 py-1.5 bg-red-50 rounded-full border border-red-200 active:scale-95"
          >
            <Pencil size={16} color="#dc2626" />
            <Text className="text-red-600 font-medium text-sm">
              Chỉnh sửa
            </Text>
          </TouchableOpacity>

          <EditProfileModal open={openEdit} onClose={() => setOpenEdit(false)} />
        </View>

        {/* BODY INFO */}
        <View className="space-y-6">

          <View>
            <Text className="text-gray-500 text-sm">Họ & tên</Text>
            <Text className="text-gray-900 text-base font-medium mt-0.5">
              {currentUser.full_name}
            </Text>
          </View>

          <View>
            <Text className="text-gray-500 text-sm">Email</Text>
            <Text className="text-gray-900 text-base font-medium mt-0.5">
              {currentUser.email}
            </Text>
          </View>

          <View>
            <Text className="text-gray-500 text-sm">Số điện thoại</Text>
            <Text className="text-gray-900 text-base font-medium mt-0.5">
              {currentUser.phone_number || "Chưa cập nhật"}
            </Text>
          </View>

          <View>
            <Text className="text-gray-500 text-sm">Vai trò</Text>
            <Text className="text-gray-900 text-base font-medium mt-0.5 capitalize">
              {currentUser.role === "admin" ? "Quản trị viên" : "Khách hàng"}
            </Text>
          </View>
        </View>
      </View>

      {/* ================================== */}
      {/* CARD: DANH SÁCH ĐỊA CHỈ */}
      {/* ================================== */}
      <AddressList />
    </View>
  );
}
