import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Banner() {
  return (
    <View className="mt-4 rounded-2xl overflow-hidden">
      <LinearGradient
        colors={["#fb923c", "#ef4444"]} // from-orange-400 to-red-500
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingVertical: 40 }}
      >
        <View className="px-6 items-center">
          <Text className="text-3xl font-bold text-white mb-3">
            Giao đồ ăn bằng Drone 🚁
          </Text>

          <Text className="text-lg text-white opacity-90 text-center">
            Giao hàng siêu tốc, an toàn và tiện lợi – chỉ với vài chạm!
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
