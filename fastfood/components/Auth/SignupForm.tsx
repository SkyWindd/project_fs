import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import type { User as UserType } from "../../constants/mockData";
import { mockUsers } from "../../constants/mockData";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../Toast/Toast";
import { useRouter } from "expo-router";

export default function SignupForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { show } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const validate = () => {
    if (name.trim().length < 2) return "Tên phải ít nhất 2 ký tự";
    if (!email.includes("@")) return "Email không hợp lệ";
    if (pass.length < 6) return "Mật khẩu phải ít nhất 6 ký tự";
    if (confirm !== pass) return "Mật khẩu không khớp";
    return null;
  };

  const handleSignup = () => {
    const error = validate();
    if (error) {
      show(error);
      return;
    }

    const exists = mockUsers.find((u) => u.email === email);
    if (exists) {
      show("Email này đã được đăng ký trước đó ❌");
      return;
    }

    const newUser: UserType = {
      user_id: mockUsers.length + 1,
      full_name: name,
      email,
      phone_number: "",
      password: pass,
      role: "customer",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    login(newUser);
    show(`Chào mừng ${name}! 🎉`);

    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView className="mt-4" keyboardShouldPersistTaps="handled">
        
        {/* CARD WRAPPER */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 28,
            padding: 24,
            borderWidth: 0.2,
            borderColor: "#e5e7eb",
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 4,
          }}
        >
          {/* TITLE */}
          <Text className="text-2xl font-bold text-gray-900 text-center">
            Tạo tài khoản mới
          </Text>
          <Text className="text-gray-500 text-center mt-1 mb-7">
            Chỉ mất vài giây để tham gia cùng chúng tôi 🚀
          </Text>

          {/* INPUT COMPONENT */}
          {/** —— Tên —— */}
          <View className="mb-5">
            <Text className="text-sm text-gray-700 font-medium mb-1">
              Họ & tên
            </Text>

            <View className="relative">
              <User
                size={20}
                color="#888"
                style={{ position: "absolute", left: 14, top: 14, zIndex: 10 }}
              />

              <TextInput
                placeholder="Nguyễn Văn A"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#aaa"
                style={{
                  backgroundColor: "#f9fafb",
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 14,
                  paddingVertical: 12,
                  paddingLeft: 48,
                  paddingRight: 16,
                  fontSize: 16,
                  color: "#111",
                }}
              />
            </View>
          </View>

          {/* —— Email —— */}
          <View className="mb-5">
            <Text className="text-sm text-gray-700 font-medium mb-1">
              Email
            </Text>

            <View className="relative">
              <Mail
                size={20}
                color="#888"
                style={{ position: "absolute", left: 14, top: 14, zIndex: 10 }}
              />

              <TextInput
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
                style={{
                  backgroundColor: "#f9fafb",
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 14,
                  paddingVertical: 12,
                  paddingLeft: 48,
                  paddingRight: 16,
                  fontSize: 16,
                  color: "#111",
                }}
              />
            </View>
          </View>

          {/* —— Password —— */}
          <View className="mb-5">
            <Text className="text-sm text-gray-700 font-medium mb-1">
              Mật khẩu
            </Text>

            <View className="relative">
              <Lock
                size={20}
                color="#888"
                style={{ position: "absolute", left: 14, top: 14, zIndex: 10 }}
              />

              <TextInput
                placeholder="••••••••"
                value={pass}
                onChangeText={setPass}
                secureTextEntry={!showPass}
                placeholderTextColor="#aaa"
                style={{
                  backgroundColor: "#f9fafb",
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 14,
                  paddingVertical: 12,
                  paddingLeft: 48,
                  paddingRight: 48,
                  fontSize: 16,
                  color: "#111",
                }}
              />

              <TouchableOpacity
                onPress={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 14, top: 12 }}
              >
                {showPass ? (
                  <EyeOff size={22} color="#777" />
                ) : (
                  <Eye size={22} color="#777" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* —— Confirm Password —— */}
          <View className="mb-6">
            <Text className="text-sm text-gray-700 font-medium mb-1">
              Xác nhận mật khẩu
            </Text>

            <View className="relative">
              <Lock
                size={20}
                color="#888"
                style={{ position: "absolute", left: 14, top: 14, zIndex: 10 }}
              />

              <TextInput
                placeholder="••••••••"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirmPass}
                placeholderTextColor="#aaa"
                style={{
                  backgroundColor: "#f9fafb",
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 14,
                  paddingVertical: 12,
                  paddingLeft: 48,
                  paddingRight: 48,
                  fontSize: 16,
                  color: "#111",
                }}
              />

              <TouchableOpacity
                onPress={() => setShowConfirmPass(!showConfirmPass)}
                style={{ position: "absolute", right: 14, top: 12 }}
              >
                {showConfirmPass ? (
                  <EyeOff size={22} color="#777" />
                ) : (
                  <Eye size={22} color="#777" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* —— BUTTON —— */}
          <TouchableOpacity
            onPress={handleSignup}
            style={{
              backgroundColor: "#e11d48",
              paddingVertical: 13,
              borderRadius: 14,
              shadowColor: "#e11d48",
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Text className="text-center text-white font-semibold text-base">
              Đăng ký
            </Text>
          </TouchableOpacity>

          {/* — Policies — */}
          <Text className="text-xs text-gray-500 text-center mt-4 leading-5">
            Khi đăng ký, bạn đồng ý với{" "}
            <Text className="text-red-600 font-semibold">
              Điều khoản dịch vụ
            </Text>{" "}
            và{" "}
            <Text className="text-red-600 font-semibold">
              Chính sách bảo mật
            </Text>
            .
          </Text>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
