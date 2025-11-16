import React from "react";
import { View } from "react-native";
import LoginSignupTabs from "../../components/Auth/LoginSignupTabs";

export default function AuthPage() {
  return (
    <View className="flex-1 bg-white pt-16 px-4">
      <LoginSignupTabs />
    </View>
  );
}
