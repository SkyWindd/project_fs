import React from "react"
import ProductCard from "../Product/ProductCard"
import mockData from "../../../mock/mockData"

// ✅ Định nghĩa kiểu dữ liệu sản phẩm theo mockData
interface ProductGridProps {
  products?: typeof mockData.menuitems // có thể truyền hoặc không
}

export default function ProductGrid({ products }: ProductGridProps) {
  // ✅ Nếu không truyền props => tự dùng mockData
  const data = products ?? mockData.menuitems

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((product, index) => (
        <ProductCard key={product.item_id} product={product} index={index} />
      ))}
    </div>
  )
}
