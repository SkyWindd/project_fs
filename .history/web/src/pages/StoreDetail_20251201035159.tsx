import React, { useState } from "react";
import { mockCategories } from "../../mock/mockData";
import AddCategoryDialog from "../components/Category/AddCategoryDialog";

export default function StoreDetail() {
  const [categories, setCategories] = useState(mockCategories);
  const [openAdd, setOpenAdd] = useState(false);

  // Hàm thêm category
  const handleAddCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Chi tiết nhà hàng</h1>

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-medium">Danh sách Category</h2>

        <button
          onClick={() => setOpenAdd(true)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Thêm Category
        </button>
      </div>

      {/* Hiển thị các category */}
      <ul className="list-disc ml-5">
        {categories.map((c) => (
          <li key={c.category_id}>{c.category_name}</li>
        ))}
      </ul>

      {/* Dialog Thêm */}
      <AddCategoryDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}
