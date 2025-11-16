import { useState, useEffect } from "react";
import { View, Animated, Platform } from "react-native";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import mockData from "../../constants/mockData";

interface HeaderProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
    categories: { id: number; name: string }[];
}

export default function Header({
  selectedCategory,
  onSelectCategory,
}: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState<
    { id: number; name: string }[]
  >([]);

  const scrollY = new Animated.Value(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // tạo listener mô phỏng behavior web
    const id = scrollY.addListener(({ value }) => {
      setScrolled(value > 50);
    });
    return () => scrollY.removeListener(id);
  }, []);

  // -------------------------------
  // 📌 Load categories từ mockData (giống web)
  // -------------------------------
  useEffect(() => {
    const formatted = mockData.categories.map((c) => ({
      id: c.category_id,
      name: c.category_name,
    }));
    setCategories(formatted);
  }, []);

  return (
    <Animated.View
      className="w-full bg-white border-b border-gray-200"
      style={{
        elevation: scrolled ? 6 : 0,
        shadowOpacity: scrolled ? 0.15 : 0.05,
        shadowRadius: scrolled ? 6 : 2,
        shadowOffset: { width: 0, height: scrolled ? 4 : 1 },
        zIndex: 50,
      }}
    >
      {/* 🔝 HeaderTop (logo + cart + user) */}
      <HeaderTop scrolled={scrolled} />

      {/* 🔻 HeaderBottom (categories + search) */}
      <HeaderBottom
        categories={categories}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch((prev) => !prev)}
        onSelectCategory={onSelectCategory}
        selectedCategory={selectedCategory}
      />
    </Animated.View>
  );
}
