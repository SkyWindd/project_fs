import React, { useState } from "react";
import type { Product, Category } from "../../../mock/mockData";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
  onSave: (item: MenuItem) => void;

  categories: Category[];                // ✔ thêm vào
  onOpenAddCategory: (open: boolean) => void;   // ✔ thêm vào
}


export default function AddProductDialog({
  open,
  onOpenChange,
  categories,
  onSave,
  onAddCategory,
}: AddProductDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  // 🔥 mini popup thêm category
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !price.trim() || !categoryId) return;

    const newProduct: Product = {
      product_id: Date.now(),
      product_name: name.trim(),
      price: Number(price),
      category_id: Number(categoryId),
    };

    onSave(newProduct);
    setName("");
    setPrice("");
    setCategoryId("");
    onOpenChange(false);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCate: Category = {
      category_id: Date.now(),
      category_name: newCategoryName.trim(),
    };

    onAddCategory(newCate);

    // chọn luôn category vừa tạo
    setCategoryId(newCate.category_id);

    setNewCategoryName("");
    setShowAddCategory(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-lg font-semibold mb-3">Thêm Sản Phẩm</h2>

        {/* Tên sản phẩm */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm..."
          className="w-full border p-2 rounded mb-3"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />

        {/* Giá */}
        <input
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá..."
          className="w-full border p-2 rounded mb-3"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />

        {/* Category + nút thêm */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <label>Category</label>
            <button
              className="text-blue-600 text-sm hover:underline"
              onClick={() => setShowAddCategory(true)}
            >
              + Thêm Category
            </button>
          </div>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border p-2 rounded"
          >
            <option value="">Chọn category...</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Nút */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="px-3 py-1 rounded bg-gray-300"
          >
            Hủy
          </button>

          <button
            onClick={handleAdd}
            className="px-3 py-1 rounded bg-green-600 text-white"
          >
            Thêm
          </button>
        </div>
      </div>

      {/* MINI POPUP ADD CATEGORY */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-xl w-[320px]">
            <h3 className="text-lg font-semibold mb-3">Thêm Category</h3>

            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Tên category..."
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddCategory(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAddCategory}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
