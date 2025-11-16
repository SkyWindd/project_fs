import React from "react";
import { View, Text } from "react-native";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <View className="py-6 items-center">
        <Text className="text-gray-500">Bạn chưa đăng nhập.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 py-10 px-4 items-center">
      <View className="w-full max-w-xl">
        <ProfileTabs />
      </View>
    </View>
  );
}
