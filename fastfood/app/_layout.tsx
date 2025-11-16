import "../global.css";
import { Slot, usePathname, Link } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// Providers
import Header from "../components/Header/Header";
import { CategoryContext } from "../context/CategoryContext";
import { AuthProvider } from "../context/AuthContext";
import { LocationProvider } from "../context/LocationContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "../components/Toast/Toast";
import mockData from "../constants/mockData";

export default function RootLayout() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const categoryOptions = [
    { id: 0, name: "Tất cả" },
    ...mockData.categories.map((c) => ({
      id: c.category_id,
      name: c.category_name,
    })),
  ];
  const pathname = usePathname();

  const isCheckoutPage = pathname === "/checkout";
  
  return (
    <SafeAreaProvider>
      {/* 🔥 Luôn hiện Status Bar */}
      <StatusBar style="dark" translucent />

      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <LocationProvider>
              <CategoryContext.Provider
                value={{ selectedCategory, setSelectedCategory }}
              >
                <View className="flex-1 bg-white">

                  {/* 🔥 Header được bọc SafeAreaView (top) */}
                  <SafeAreaView edges={["top"]} className="bg-white">
                    {!isCheckoutPage ? (
                      <Header
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        categories={categoryOptions}
                      />
                    ) : (
                      <View className="py-4 items-center border-b bg-white shadow-sm">
                        <Link href="/" asChild>
                          <TouchableOpacity>
                            <Text className="font-bold text-red-600 text-2xl">
                              PIZZAHOUSE
                            </Text>
                          </TouchableOpacity>
                        </Link>
                      </View>
                    )}
                  </SafeAreaView>

                  {/* 🔥 CONTENT không bọc SafeAreaView */}
                  <View className="flex-1">
                    <Slot />
                  </View>

                </View>
              </CategoryContext.Provider>
            </LocationProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
