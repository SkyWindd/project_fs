import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Link } from "expo-router";
import { FontAwesome, Feather } from "@expo/vector-icons";

export default function Footer() {
  return (
    <View className="bg-gray-50 border-t border-gray-200">

      {/* MAIN */}
      <View className="px-4 py-6">

        {/* Logo + Social */}
        <View className="mb-5">
          <Link href="/" asChild>
            <TouchableOpacity>
              <Text className="text-red-600 text-2xl font-bold font-[Birthstone]">
                PIZZAHOUSE
              </Text>
            </TouchableOpacity>
          </Link>

          <View className="flex-row items-center gap-3 mt-3">
            <TouchableOpacity >
              <FontAwesome name="facebook" size={22} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity >
              <FontAwesome name="youtube-play" size={22} color="#FF0000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="mail" size={22} color="#444" />
            </TouchableOpacity>
          </View>
        </View>


        {/* Vị trí */}
        <View className="mb-4">
          <Text className="text-base font-semibold mb-2">Vị trí cửa hàng</Text>
          <Text className="text-gray-600 text-sm leading-5">
            273 An Dương Vương, Phường Chợ Quán, TP. Hồ Chí Minh
          </Text>
        </View>

      </View>

      
    </View>
  );
}
