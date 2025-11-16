import React from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import ProductCard from "../Product/ProductCard";
import mockData from "../../constants/mockData";

interface ProductGridProps {
  products?: typeof mockData.menuitems;
}

export default function ProductGrid({ products }: ProductGridProps) {
  // Nếu không truyền props => dùng mockData
  const data = products ?? mockData.menuitems;

  // Lọc sản phẩm còn hàng
  const availableProducts = data.filter((p) => p.is_available === true);

  // Tự động đổi số cột theo kích thước màn hình
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1; // Tablet 2 cột, mobile 1 cột

  return (
  <FlatList
    data={availableProducts}
    keyExtractor={(item) => item.item_id.toString()}
    numColumns={numColumns}
    columnWrapperStyle={
      numColumns > 1
        ? {
            justifyContent: "space-between",
            marginBottom: 16, // khoảng cách giữa các dòng
          }
        : undefined
    }
    contentContainerStyle={{
      paddingHorizontal: 12,
      paddingBottom: 24,
    }}
    renderItem={({ item, index }) => (
      <View
        style={{
          flex: 1,
          marginBottom: numColumns === 1 ? 16 : 0, // khoảng cách hàng cho mobile
        }}
      >
        <ProductCard product={item} index={index} />
      </View>
    )}
  />
);

}
