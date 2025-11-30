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
import type { Category } from "../../mock/mockData";

export default function StoreDetail() {
  const { id } = useParams();
  const store = stores.find((s) => s.store_id === Number(id));

  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  if (!store) return <p>Không tìm thấy cửa hàng</p>;

  // ⬅ Hàm thêm category mới
  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
    console.log("Đã thêm Category:", newCategory);
  };

  return (
    <div className="p-4">
      <StoreHeader store={store} />

      {/* --- BUTTONS --- */}
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

      {/* --- HIỂN THỊ CATEGORY RA MÀN HÌNH --- */}
      <h3 className="text-lg font-semibold mt-6">Danh mục</h3>

      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((c) => (
          <span
            key={c.category_id}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {c.category_name}
          </span>
        ))}
      </div>

      {/* --- MENU ITEMS --- */}
      <h3 className="text-lg font-semibold mt-6">Menu</h3>
      <MenuGrid items={mockMenuItems} categories={categories} />

      {/* --- DIALOG THÊM CATEGORY --- */}
      <AddCategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}
