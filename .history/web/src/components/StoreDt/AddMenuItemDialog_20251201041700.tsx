import React, { useState } from "react";
import type { MenuItem, Category } from "../../../mock/mockData";

interface AddMenuItemDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
  categories: Category[];
}

export default function AddMenuItemDialog({
  open,
  onClose,
  onAdd,
  categories,
}: AddMenuItemDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  if (!open) return null;

  const handleAdd = () => {
    if (!name.trim() || !price || !categoryId) return;

const now = new Date();
const newItem: MenuItem = {
  item_id: Date.now(),
  name,
  price: Number(price),
  category_id: categoryId,
  description: "",
  image_url: "",
  is_available: true,
  created_at: now.toLocaleString("vi-VN"),
  updated_at: now.toLocaleString("vi-VN"),
};


    onAdd(newItem);
    onClose();
    setName("");
    setPrice("");
    setCategoryId(null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[350px]">
        <h2 className="text-lg font-semibold mb-3">Thêm món</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Tên món..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Giá..."
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-3"
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value="">-- Chọn danh mục --</option>

          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.category_name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
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
    </div>
  );
}
