import React from "react"
import { Search } from "lucide-react"
import { Input } from "../ui/input"

interface HeaderBottomProps {
  categories: { id: number; name: string; link?: string }[]
  showSearch: boolean
  onToggleSearch: () => void
  onSelectCategory: (category: string) => void
  selectedCategory: string
}

export default function HeaderBottom({
  categories,
  showSearch,
  onToggleSearch,
  onSelectCategory,
  selectedCategory,
}: HeaderBottomProps) {
  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 overflow-x-auto">
        {/* 🔍 Nút tìm kiếm */}
        <button
          className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition"
          onClick={onToggleSearch}
        >
          <Search className="w-5 h-5 text-gray-700" />
        </button>

        {/* 🔹 Danh mục */}
        <div className="flex-1 flex justify-start sm:justify-center overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-5 sm:gap-8 text-sm sm:text-base font-medium whitespace-nowrap">
            <button
              onClick={() => onSelectCategory("Tất cả")}
              className={`flex-shrink-0 transition-all duration-150 ${
                selectedCategory === "Tất cả"
                  ? "text-red-600 font-semibold"
                  : "text-gray-700 hover:text-red-600 hover:scale-[1.05]"
              }`}
            >
              Tất cả
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`flex-shrink-0 transition-all duration-150 ${
                  selectedCategory === cat.name
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 hover:text-red-600 hover:scale-[1.05]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-6 sm:w-8" />
      </div>

      {showSearch && (
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
          <Input
            placeholder="Tìm món ăn, combo..."
            className="w-full text-sm md:text-base"
          />
        </div>
      )}
    </div>
  )
}
