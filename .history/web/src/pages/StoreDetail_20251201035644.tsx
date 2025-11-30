import { useParams } from "react-router-dom";
import { useState } from "react";

import StoreHeader from "../components/StoreDt/StoreHeader";
import MenuGrid from "../components/StoreDt/MenuGrid";

import {
  stores,
  mockMenuItems,
  mockCategories,
  type Category,
} from "../../mock/mockData";

import AddCategoryDialog from "../components/StoreDt/AddCategoryDialog";

export default function StoreDetail() {
  const { id } = useParams();
  const store = stores.find((s) => s.store_id === Number(id));

  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [menuItems, setMenuItems] = useState(mockMenuItems);

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  if (!store) return <p>Không tìm thấy cửa hàng</p>;

  // 👉 Thêm category
  const handleAddCategory = (newCategory: Category) => {
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setOpenCategoryDialog(true)}
        >
          + Thêm Category
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-6">Menu</h3>

      {/* 👉 TRUYỀN categories state để cập nhật UI */}
      <MenuGrid items={menuItems} categories={categories} />

      {/* 👉 Dialog thêm category */}
      <AddCategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}
