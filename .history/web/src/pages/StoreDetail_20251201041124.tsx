import { useParams } from "react-router-dom";
import { useState } from "react";

import StoreHeader from "../components/StoreDt/StoreHeader";
import MenuGrid from "../components/StoreDt/MenuGrid";
import AddCategoryDialog from "../components/StoreDt/AddCategoryDialog";

import {
  stores,
  mockMenuItems,
  mockCategories,
} from "../../mock/mockData";
import type { Category, MenuItem } from "../../mock/mockData";

export default function StoreDetail() {
  const { id } = useParams();
  const store = stores.find((s) => s.store_id === Number(id));

  // Categories
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  // Menu items — dùng state để sau này thêm món được
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  // Category đang chọn
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");

  if (!store) return <p>Không tìm thấy cửa hàng</p>;

  // Lọc items theo category (DÙNG menuItems trong state)
  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category_id === selectedCategory);

  // Thêm category
  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
    console.log("Đã thêm Category:", newCategory);
  };

  return (
    <div className="p-4">
      <StoreHeader store={store} />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-2">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
          + Thêm món
        </button>

        <button
          onClick={() => setOpenCategoryDialog(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Thêm Category
        </button>
      </div>

      {/* CATEGORY FILTER */}
      <h3 className="text-lg font-semibold mt-6">Danh mục</h3>

      <div className="flex flex-wrap gap-2 mt-2">

        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1 rounded-full border 
            ${
              selectedCategory === "all"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
        >
          Tất cả
        </button>

        {categories.map((c) => (
          <button
            key={c.category_id}
            onClick={() => setSelectedCategory(c.category_id)}
            className={`px-3 py-1 rounded-full border 
              ${
                selectedCategory === c.category_id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {c.category_name}
          </button>
        ))}
      </div>

      {/* MENU ITEMS */}
      <h3 className="text-lg font-semibold mt-6">Menu</h3>
      <MenuGrid items={filteredItems} categories={categories} />

      <AddCategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}
