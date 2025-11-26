import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import type { MenuItem } from "../../../mock/mockData"

interface Props {
  items: MenuItem[]
  search: string
  setSearch: (value: string) => void
  category: number | "all"
  setCategory: (value: number | "all") => void
}

export default function ProductFilter({
  items,
  search,
  setSearch,
  category,
  setCategory,
}: Props) {
  const pizzaCount = items.filter((i) => i.category_id === 1).length
  const sideCount = items.filter((i) => i.category_id === 2).length
  const drinkCount = items.filter((i) => i.category_id === 3).length
  const totalCount = items.length

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Bộ lọc danh mục */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={category === "all" ? "default" : "outline"}
          onClick={() => setCategory("all")}
          className="flex items-center gap-2"
        >
          🧩 Tất cả
          <Badge variant="secondary">{totalCount}</Badge>
        </Button>

        <Button
          variant={category === 1 ? "default" : "outline"}
          onClick={() => setCategory(1)}
          className="flex items-center gap-2"
        >
          🍕 Pizza
          <Badge variant="secondary">{pizzaCount}</Badge>
        </Button>

        <Button
          variant={category === 2 ? "default" : "outline"}
          onClick={() => setCategory(2)}
          className="flex items-center gap-2"
        >
          🍟 Món ăn kèm
          <Badge variant="secondary">{sideCount}</Badge>
        </Button>

        <Button
          variant={category === 3 ? "default" : "outline"}
          onClick={() => setCategory(3)}
          className="flex items-center gap-2"
        >
          🧃 Đồ uống
          <Badge variant="secondary">{drinkCount}</Badge>
        </Button>
      </div>

      {/* Ô tìm kiếm */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="🔍 Tìm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  )
}
