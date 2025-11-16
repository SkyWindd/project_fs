import { Link } from "expo-router";
import LocationSelector from "../Location/LocationSelector";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import { View, Text } from "react-native";

export default function HeaderTop({ scrolled }: { scrolled: boolean }) {
  return (
    <View
      className={`w-full flex-row items-center justify-between px-4 bg-white border-b border-gray-100
        ${scrolled ? "py-2" : "py-3"}`}
    >
      {/* LEFT — Location */}
      <View className="w-[33%] pr-10">
        <LocationSelector />
      </View>

      {/* CENTER — Logo */}
      <View className="w-[34%] items-center justify-center">
        <Link href="/" asChild>
          <Text
            className={`font-bold text-red-600 tracking-wider font-[Birthstone]
              ${scrolled ? "text-lg" : "text-xl"}`}
          >
            PIZZAHOUSE
          </Text>
        </Link>
      </View>

      {/* RIGHT — Cart + User */}
      <View className="w-[33%] flex-row items-center justify-end gap-4">
        <CartIcon />
        <UserMenu />
      </View>
    </View>
  );
}
