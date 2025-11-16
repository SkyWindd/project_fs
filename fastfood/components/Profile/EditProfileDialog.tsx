import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { X, Eye, EyeOff } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../Toast/Toast";

export default function EditProfileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { currentUser, updateUser } = useAuth();
  const { show } = useToast();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.full_name);
      setPhone(currentUser.phone_number || "");
      setPassword(currentUser.password);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!fullName.trim()) {
      show("Tên không được để trống ❌");
      return;
    }

    if (!currentUser?.user_id) {
      show("Lỗi dữ liệu: thiếu user_id ❌");
      return;
    }

    const updated = {
      ...currentUser,
      full_name: fullName,
      phone_number: phone,
      password,
      updated_at: new Date().toISOString(),
    };

    updateUser(updated);
    show("Cập nhật thông tin thành công 🎉");
    onClose();
  };

  if (!currentUser) return null;

  return (
    <Modal visible={open} animationType="fade" transparent>
      {/* OVERLAY */}
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/40 absolute inset-0"
      />

      {/* MODAL CENTER */}
      <View className="flex-1 justify-center items-center px-5">
        <View className="w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl">

          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-bold text-gray-900">
              Chỉnh sửa thông tin
            </Text>

            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
            >
              <X size={20} color="#555" />
            </TouchableOpacity>
          </View>

          {/* FORM */}
          <ScrollView className="space-y-5 max-h-[60vh]">

            {/* Họ & Tên */}
            <View>
              <Text className="text-gray-700 mb-1 text-sm">Họ & tên</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Nguyễn Văn A"
                className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              />
            </View>

            {/* Phone */}
            <View>
              <Text className="text-gray-700 mb-1 text-sm">Số điện thoại</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="0987 123 456"
                keyboardType="phone-pad"
                className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              />
            </View>

            {/* Password */}
            <View>
              <Text className="text-gray-700 mb-1 text-sm">Mật khẩu</Text>

              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-900"
                />

                <TouchableOpacity
                  onPress={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3"
                >
                  {showPass ? (
                    <EyeOff size={20} color="#777" />
                  ) : (
                    <Eye size={20} color="#777" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* SAVE BUTTON */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-red-600 py-3 rounded-xl active:opacity-90 mt-2"
            >
              <Text className="text-center text-white text-base font-semibold">
                Lưu thay đổi
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
