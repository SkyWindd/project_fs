import { useParams } from "react-router-dom";
import { useState } from "react";

import StoreHeader from "../components/StoreDt/StoreHeader";
import MenuGrid from "../components/StoreDt/MenuGrid";

import {
  stores,
  mockMenuItems,
  mockCategories,
} from "../../mock/mockData";

import AddCategoryDialog from "../components/S/AddCategoryDialog";

export default function StoreDetail() {
  const { id } = useParams();
  const store = stores.find((s) => s.store_id === Number(id));

  // ⭐ State quản lý category + dialog
  const [categories, setCategories] = useState(mockCategories);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  if (!store) return <p>Không tìm thấy cửa hàng</p>;

  // ⭐ Hàm thêm category mới
  const handleAddCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <div className="p-4">
      <StoreHeader store={store} />

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

      <h3 className="text-lg font-semibold mt-6">Menu</h3>

      {/* ⭐ Truyền categories đã cập nhật */}
      <MenuGrid items={mockMenuItems} categories={categories} />

      {/* ⭐ Dialog thêm Category */}
      <AddCategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}
