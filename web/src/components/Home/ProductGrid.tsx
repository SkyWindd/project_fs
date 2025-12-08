import React from "react";
import ProductCard from "../Product/ProductCard";
import { useMenu } from "../../context/MenuContext";
import { useStoreMenu } from "../../context/StoreMenuContext";
import { PriceFilter } from "./PriceFilter";


interface ProductGridProps {
  selectedCategory: string;
}
interface ProductGridProps {
  selectedCategory: string;
  priceRange?: [number, number] | null; 
}

export default function ProductGrid({ selectedCategory }: ProductGridProps) {
  const { menuItems } = useMenu();        // tất cả sản phẩm từ backend
  const { storeMenu } = useStoreMenu();   // menu theo cửa hàng
  const [priceFilter, setPriceFilter] = React.useState<string>("all"); 
  const [filteredProducts, setFilteredProducts] = React.useState(menuItems);

  switch (priceFilter) {
    case "0-100":
      return price >= 0 && price <= 100;
    case "100-200":
      return price > 100 && price <= 200;
    case "200-500":
      return price > 200 && price <= 500;
    case "500+":
      return price > 500;
    default:
      return true; // "all"
  }

  // Map category name → id (theo backend của bạn)
  const categoryMap: Record<string, number> = {
    "Pizza": 1,
    "Món ăn kèm": 2,
    "Đồ uống": 3,
    "Tất cả": 0,
  };

  const selectedCategoryId = categoryMap[selectedCategory] || 0;

  // ============================
  // ⭐ Bước 1 — Nếu chưa chọn cửa hàng → show toàn bộ menu
  // ============================
  let filteredItems = menuItems;

  // ============================
  // ⭐ Bước 2 — Đã chọn cửa hàng → lọc theo storeMenu
  // ============================
  if (storeMenu.length > 0) {
    filteredItems = storeMenu
      .filter((m) => m.is_available) // chỉ món đang mở bán
      .map((m) => {
        const product = menuItems.find((p) => p.item_id === m.item_id);
        if (!product) return null;

        return {
          ...product,
          price: m.price_override ?? product.price, // giá theo cửa hàng
        };
      })
      .filter(Boolean) as any[];
  }

  // ============================
  // ⭐ Bước 3 — Lọc theo danh mục
  // ============================
  const finalItems =
    selectedCategoryId === 0
      ? filteredItems
      : filteredItems.filter((item) => item.category_id === selectedCategoryId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <PriceFilter value="" onChange={() => {}} />
      {finalItems.map((product, index) => (
        <ProductCard key={product.item_id} product={product} index={index} />
      ))}
    </div>

  );
}
