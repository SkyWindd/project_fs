import { View, Text, FlatList } from "react-native";
import Banner from "../components/Home/Banner";
import ProductGrid from "../components/Home/ProductGrid";
import mockData from "../constants/mockData";
import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import Footer from "../components/Footer/Footer";

export default function Home() {
  const { selectedCategory } = useContext(CategoryContext);

  const [refreshing, setRefreshing] = useState(false);

  const products = mockData.menuitems;
  const categories = mockData.categories;

  const filteredProducts =
    selectedCategory === "Tất cả"
      ? products
      : products.filter((p) => {
          const cat = categories.find(
            (c) => c.category_id === p.category_id
          );
          return (
            cat &&
            cat.category_name.toLowerCase() ===
              selectedCategory.toLowerCase()
          );
        });

  const listData =
    selectedCategory === "Tất cả" ? categories : filteredProducts;

  const onRefresh = () => {
    setRefreshing(true);

    // Nếu có API thì gọi ở đây
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  return (
    <FlatList
      data={listData}
      extraData={selectedCategory}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}       // ⭐ REQUIRED
      onRefresh={onRefresh}         // ⭐ REQUIRED
      keyExtractor={(item: any) => {
        if ("category_name" in item) return `cat-${item.category_id}`;
        return `prod-${item.item_id}`;
      }}
      ListHeaderComponent={
        <View className="mb-4">
          <Banner />
        </View>
      }
      ListFooterComponent={<Footer />}
      renderItem={({ item }: any) =>
        "category_name" in item ? (
          <View className="bg-white p-5 mt-8 mx-4 shadow-sm border border-gray-200 rounded-2xl mb-5">
            <Text className="text-xl font-semibold text-gray-900 mb-5">
              {item.category_name}
            </Text>

            <ProductGrid
              products={products.filter(
                (p) => p.category_id === item.category_id
              )}
            />
          </View>
        ) : (
          <View className="bg-white rounded-2xl mb-5 p-5 mt-8 mx-4 shadow-sm border border-gray-200">
            <ProductGrid products={[item]} />
          </View>
        )
      }
    />
  );
}
