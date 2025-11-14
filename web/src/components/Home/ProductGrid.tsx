import React from "react"
import ProductCard from "../Product/ProductCard"
import mockData from "../../../mock/mockData"

// ✅ Định nghĩa kiểu dữ liệu sản phẩm theo mockData
interface ProductGridProps {
  products?: typeof mockData.menuitems
}

export default function ProductGrid({ products }: ProductGridProps) {
  // Nếu không truyền props => tự dùng mockData
  const data = products ?? mockData.menuitems

  // 🟢 Lọc sản phẩm còn hàng
  const availableProducts = data.filter((p) => p.is_available === true)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {availableProducts.map((product, index) => (
        <ProductCard key={product.item_id} product={product} index={index} />
      ))}
    </div>
  )
}
