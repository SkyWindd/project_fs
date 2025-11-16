import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Search } from "lucide-react-native";

interface HeaderBottomProps {
  categories: { id: number; name: string }[];
  showSearch: boolean;
  onToggleSearch: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export default function HeaderBottom({
  categories,
  showSearch,
  onToggleSearch,
  onSelectCategory,
  selectedCategory,
}: HeaderBottomProps) {
  return (
    <View className="bg-white border-t border-gray-200">

      {/* TOP ROW */}
      <View className="flex-row items-center justify-between px-3 py-2">

        {/* 🔍 Search button */}
        <TouchableOpacity
          onPress={onToggleSearch}
          className="p-2 rounded-full active:bg-gray-100"
        >
          <Search size={20} color="#444" />
        </TouchableOpacity>

        {/* 🔹 Category List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          className="flex-1 mx-2"
        >
          <View className="flex-row items-center gap-x-6">
            {/* Tất cả */}
            <TouchableOpacity onPress={() => onSelectCategory("Tất cả")}>
              <Text
                className={
                  selectedCategory === "Tất cả"
                    ? "text-red-600 font-semibold"
                    : "text-gray-700"
                }
              >
                Tất cả
              </Text>
            </TouchableOpacity>

            {/* Categories */}
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => onSelectCategory(cat.name)}
              >
                <Text
                  className={
                    selectedCategory === cat.name
                      ? "text-red-600 font-semibold"
                      : "text-gray-700"
                  }
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View className="w-6" />
      </View>

      {/* SEARCH BAR */}
      {showSearch && (
        <View className="bg-gray-50 border-t border-gray-200 px-4 py-2">
          <TextInput
            placeholder="Tìm món ăn, combo..."
            className="bg-white px-3 py-2 rounded-lg border border-gray-300 text-sm"
          />
        </View>
      )}
    </View>
  );
}
