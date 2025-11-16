import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { mockUsers } from "../../constants/mockData";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../Toast/Toast";
import { useRouter } from "expo-router";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { show } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      show("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      show("Sai email hoặc mật khẩu ❌");
      return;
    }

    if (!user.is_active) {
      show("Tài khoản của bạn đã bị khóa 🚫");
      return;
    }

    login(user);
    show(`Xin chào ${user.full_name}! 🎉`);

    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="mt-6"
    >
      <View className="bg-white border border-gray-50 rounded-3xl p-7 shadow-sm">
        
        {/* Title */}
        <View className="mb-6">
          <Text className="text-xl font-extrabold text-gray-900 text-center">
            👋 Chào mừng bạn trở lại!
          </Text>
          <Text className="text-gray-500 text-center mt-1 text-sm">
            Đăng nhập để tiếp tục mua sắm
          </Text>
        </View>

        {/* Email Field */}
        <View className="mb-5">
          <Text className="text-sm text-gray-700 font-medium mb-1">
            Email
          </Text>
          <View className="relative justify-center">
            <Mail
              size={18}
              color="#888"
              style={{ position: "absolute", left: 14,  zIndex: 10 }}
            />
             <TextInput
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
                style={{
                    backgroundColor: "#f8f8f8",
                    borderWidth: 1,
                    borderColor: "#d4d4d4",
                    borderRadius: 14,
                    paddingVertical: 12,
                    paddingLeft: 48,      // ⭐ padding trái vừa đủ để tránh icon
                    paddingRight: 16,
                    fontSize: 14,
                    color: "#222",
                }}
                />
          </View>
        </View>

        {/* Password Field */}
        <View className="mb-6">
          <Text className="text-sm text-gray-700 font-medium mb-1">
            Mật khẩu
          </Text>
           <View className="relative justify-center">
    {/* ICON LOCK */}
    <Lock
      size={20}
      color="#888"
      style={{
        position: "absolute",
        left: 14,
        zIndex: 10,
      }}
    />

                {/* INPUT */}
                <TextInput
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                placeholderTextColor="#999"
                style={{
                    backgroundColor: "#f8f8f8",
                    borderWidth: 1,
                    borderColor: "#d4d4d4",
                    borderRadius: 14,
                    paddingVertical: 12,
                    paddingLeft: 48,   // ⭐ icon bên trái
                    paddingRight: 48,  // ⭐ chừa chỗ cho icon mắt
                    fontSize: 16,
                    color: "#222",
                }}
                />

                {/* ICON SHOW / HIDE PASSWORD */}
                <TouchableOpacity
                onPress={() => setShowPass(!showPass)}
                style={{
                    position: "absolute",
                    right: 14,
                    zIndex: 10,
                }}
                >
                {showPass ? (
                    <EyeOff size={22} color="#666" />
                ) : (
                    <Eye size={22} color="#666" />
                )}
                </TouchableOpacity>
            </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="py-3 rounded-xl active:opacity-90"
          style={{
            backgroundColor: "#e3342f",
            shadowColor: "#e3342f",
            shadowOpacity: 0.25,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
          }}
          onPress={handleLogin}
        >
          <Text className="text-center text-white font-semibold text-base tracking-wide">
            Đăng nhập
          </Text>
        </TouchableOpacity>

        {/* Forgot password */}
        <Text className="text-xs text-gray-500 text-center mt-4">
          Quên mật khẩu?{" "}
          <Text className="text-red-600 font-semibold">Khôi phục ngay</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
