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
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);

  const handleAdd = () => {
    const newItem: MenuItem = {
      item_id: Date.now(),
      name,
      description: desc,
      price,
      category_id: categoryId,
      image_url: "",
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onAdd(newItem);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-lg font-semibold mb-3">Thêm món</h2>

        <input
          placeholder="Tên món..."
          className="w-full border p-2 rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Mô tả..."
          className="w-full border p-2 rounded mb-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          placeholder="Giá..."
          className="w-full border p-2 rounded mb-2"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value={0}>Chọn category</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.category_name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Hủy
          </button>

          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
